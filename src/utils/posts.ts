export function mergePosts(prev: any[], incoming: any[]) {
  const map = new Map(prev.map((p) => [p._id, p]));
  incoming.forEach((p) => map.set(p._id, p));
  return Array.from(map.values());
}
