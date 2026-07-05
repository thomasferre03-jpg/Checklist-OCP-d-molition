import { useEffect, useState } from 'react'
import { Download, ExternalLink, FileText, ImageIcon, LinkIcon } from 'lucide-react'

import {
  fetchResourcesForItem,
  getResourceDisplayUrl,
  getResourceDownloadUrl,
} from '@/services/resources'
import { cleanText } from '@/lib/text'
import type { AssociatedResource } from '@/types/resource'

interface AssociatedResourcesProps {
  itemId: number
  staticResources?: AssociatedResource[]
}

function iconFor(resource: AssociatedResource) {
  if (resource.type === 'image') {
    return <ImageIcon size={16} />
  }
  if (resource.type === 'pdf') {
    return <FileText size={16} />
  }

  return <LinkIcon size={16} />
}

function ResourceCard({ resource }: { resource: AssociatedResource }) {
  const displayUrl = getResourceDisplayUrl(resource)
  const title = cleanText(resource.title)

  if (resource.type === 'image') {
    return (
      <article className="resource-card image-resource">
        <div className="resource-title">
          {iconFor(resource)}
          <span>{title}</span>
        </div>
        <a href={displayUrl} rel="noreferrer" target="_blank">
          <img alt={title} src={displayUrl} />
        </a>
      </article>
    )
  }

  if (resource.type === 'pdf') {
    return (
      <article className="resource-card pdf-resource">
        <div className="resource-title">
          {iconFor(resource)}
          <span>{title}</span>
        </div>
        <a className="resource-action" download href={getResourceDownloadUrl(resource)}>
          <Download size={15} />
          Télécharger
        </a>
      </article>
    )
  }

  return (
    <article className="resource-card link-resource">
      <div className="resource-title">
        {iconFor(resource)}
        <span>{title}</span>
      </div>
      <a className="resource-action" href={displayUrl} rel="noreferrer" target="_blank">
        <ExternalLink size={15} />
        Ouvrir
      </a>
    </article>
  )
}

function messageFromError(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return 'Impossible de charger les ressources associées.'
}

export function AssociatedResources({ itemId, staticResources = [] }: AssociatedResourcesProps) {
  const [resources, setResources] = useState<AssociatedResource[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const visibleResources = [...staticResources, ...resources]

  useEffect(() => {
    let isMounted = true

    async function loadResources() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const nextResources = await fetchResourcesForItem(itemId)
        if (isMounted) {
          setResources(nextResources)
        }
      } catch (error) {
        if (isMounted) {
          setResources([])
          setErrorMessage(messageFromError(error))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadResources()

    return () => {
      isMounted = false
    }
  }, [itemId])

  if (isLoading && !visibleResources.length) {
    return <div className="empty-panel">Chargement des ressources...</div>
  }

  if (errorMessage && !visibleResources.length) {
    return <div className="resource-error">{errorMessage}</div>
  }

  if (!visibleResources.length) {
    return <div className="empty-panel">Aucune ressource associée.</div>
  }

  return (
    <>
      {errorMessage ? <div className="resource-warning">Les ressources Supabase n'ont pas pu etre chargees.</div> : null}
      <div className="resource-grid">
        {visibleResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </>
  )
}
