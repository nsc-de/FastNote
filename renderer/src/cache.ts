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

export function searchTree<T>(treeLayers: number = 3, data?: unknown) {
  const cache = data ?? {};

  function insert(path: string, value: T) {
    multilayer_get_helper(
      path,
      cache,
      (obj, subpath) => {
        (obj as Record<string, T>)[subpath] = value;
      },
      treeLayers
    );
  }

  function get(path: string): T | undefined {
    let result: T | undefined = undefined;
    multilayer_get_helper(
      path,
      cache,
      (obj, subpath) => {
        result = (obj as Record<string, T>)[subpath];
      },
      treeLayers
    );
    return result;
  }

  return { insert, get };
}
