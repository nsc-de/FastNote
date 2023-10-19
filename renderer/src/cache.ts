export function get_helper<T>(
  path: string,
  obj: { [key: string]: T },
  lambda: (obj: T, subpath: string) => void | T
) {
  const path_head = path[0];
  const path_tail = path.slice(1);

  const result = lambda(obj[path_head], path_tail);
  if (result !== undefined) obj[path_head] = result;

  return obj;
}

export function multilayer_get_helper(
  path: string,
  obj: unknown,
  lambda: (obj: unknown, subpath: string) => void | unknown,
  layers: number
): unknown {
  if (layers === 0) {
    return lambda(obj, path);
  }

  return get_helper(path, obj as Record<string, unknown>, (obj, subpath) => {
    const old_value = (obj as Record<string, unknown>) ?? {};
    return (
      multilayer_get_helper(subpath, old_value, lambda, layers - 1) ?? old_value
    );
  });
}

export function searchTree(treeLayers: number = 3) {
  const cache = {};

  function insert(path: string, value: any) {}
}
