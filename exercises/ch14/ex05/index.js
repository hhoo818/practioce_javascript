export function getTypeOfTemplateLiteral(strings, ...values) {
  return values.map((value) => typeof value).join(" ");
}
