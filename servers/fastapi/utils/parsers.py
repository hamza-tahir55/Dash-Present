from typing import Optional

def parse_bool_or_none(value: Optional[str]) -> Optional[bool]:
    if value is None:
        return None
    return value.lower() == "true"
