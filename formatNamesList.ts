export function formatNamesList(names: string[]) {
  if (names.length === 1) return names[0];

  const rest = names.slice(0, -1).join(", ");
  const last = names[names.length - 1];
  return `${rest} y ${last}`;
}
