interface LightboxProps {
  imageUrl: string
  onClose: () => void
}

export function Lightbox({ imageUrl, onClose }: LightboxProps) {
  return (
    <div
      className="lightbox"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
      role="presentation"
    >
      <button className="close-lb" onClick={onClose} type="button">
        Fermer ✕
      </button>
      <img alt="Photo de suivi agrandie" src={imageUrl} />
    </div>
  )
}
