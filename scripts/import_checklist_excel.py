from __future__ import annotations

import json
import re
import sys
from pathlib import Path

import pandas as pd


SOURCE_PATH = Path("C:/Users/arfer/Downloads/Checklist_OCP_Demolition_completee.xlsx")
OUTPUT_PATH = Path("src/data/checklist-items.ts")
SHEET_NAME = "Checklist OCP"


def text(value: object) -> str:
    if pd.isna(value):
        return ""
    return str(value).strip()


def is_empty_resource(value: str) -> bool:
    normalized = value.strip().lower()
    return not normalized or normalized.startswith("pas de ressource specifique") or normalized.startswith(
        "pas de ressource spécifique"
    )


def clean_url(value: str) -> str:
    return value.rstrip(").,;")


def resource_title(part: str, url: str) -> str:
    title = part.replace(url, "").strip()
    title = re.sub(r"\s*[:：-]\s*$", "", title).strip()
    return title or url


def parse_resources(value: object, item_id: int) -> list[dict[str, object]]:
    raw = text(value)
    if is_empty_resource(raw):
        return []

    resources: list[dict[str, object]] = []
    parts = [part.strip() for part in re.split(r"\s+\|\s+|\n+", raw) if part.strip()]

    for part_index, part in enumerate(parts, start=1):
        urls = [clean_url(url) for url in re.findall(r"https?://\S+", part)]

        if not urls and ".pdf" in part.lower():
            filename = Path(part).name or part
            resources.append(
                {
                    "id": f"excel-{item_id}-{part_index}",
                    "itemId": item_id,
                    "title": filename,
                    "type": "pdf",
                    "url": part,
                    "storageBucket": None,
                    "createdAt": "",
                }
            )
            continue

        for url_index, url in enumerate(urls, start=1):
            title = resource_title(part, url)
            resource_type = "pdf" if re.search(r"\.pdf(?:[?#].*)?$", url, re.IGNORECASE) else "link"
            resources.append(
                {
                    "id": f"excel-{item_id}-{part_index}-{url_index}",
                    "itemId": item_id,
                    "title": title,
                    "type": resource_type,
                    "url": url,
                    "storageBucket": None,
                    "createdAt": "",
                }
            )

    return resources


def row_id(value: object, fallback: int) -> int:
    if pd.isna(value):
        return fallback
    try:
        return int(value)
    except (TypeError, ValueError):
        return fallback


def main() -> int:
    if not SOURCE_PATH.exists():
        print(f"Excel introuvable: {SOURCE_PATH}", file=sys.stderr)
        return 1

    df = pd.read_excel(SOURCE_PATH, sheet_name=SHEET_NAME)
    items: list[dict[str, object]] = []

    for index, row in df.iterrows():
        action = text(row.get("Action"))
        if not action:
            continue

        item_id = row_id(row.get("N°"), index + 1)
        items.append(
            {
                "id": item_id,
                "phase": text(row.get("Phase")),
                "categorie": text(row.get("Catégorie")),
                "action": action,
                "bonnePratique": text(row.get("Bonne pratique")),
                "description": text(row.get("Description de l'action")),
                "resources": parse_resources(row.get("Ressources"), item_id),
            }
        )

    OUTPUT_PATH.write_text(
        "import type { ChecklistItem } from '@/types/checklist'\n\n"
        "// Generated from C:/Users/arfer/Downloads/Checklist_OCP_Demolition_completee.xlsx.\n"
        "export const CHECKLIST_ITEMS: ChecklistItem[] = "
        + json.dumps(items, ensure_ascii=False, indent=2)
        + "\n",
        encoding="utf-8",
    )

    resource_count = sum(len(item["resources"]) for item in items)
    print(f"{len(items)} actions importees, {resource_count} ressources associees.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
