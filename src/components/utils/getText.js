export default function getText(html) {
  let plainString = html.replace(/<[^>]+>/g, '');

  return plainString;
}
