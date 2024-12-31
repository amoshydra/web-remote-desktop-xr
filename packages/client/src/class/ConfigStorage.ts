interface Definition {
  [property: string]: (
    | {
      type: "boolean",
      defaultValue: boolean
    }
    | {
      type: "string",
      defaultValue: string
    }
  )
}

type DefinitionReturn<T extends Definition> = {
  [V in keyof T]: {
    get: () => T[V]["defaultValue"]
    set: (v: T[V]["defaultValue"]) => void
  }
}

export const createConfigStore = <T extends Definition>(definitions: T): DefinitionReturn<T> => {
  return (
    Object.fromEntries(
      Object.entries(definitions)
        .map(([property, { defaultValue, type }]) => {
          if (type === "boolean") {
            return [property, {
              set(value: boolean) {
                localStorage.setItem(property, value ? "true" : "false")
              },
              get() {
                const val = localStorage.getItem(property);
                if (val === null) {
                  return defaultValue;
                }
                return val;
              }
            }]
          }
          return [
            property, {
              set(value: string) {
                localStorage.setItem(property, value);
              },
              get() {
                return localStorage.getItem(property) || defaultValue;
              },
            },
          ];
        })
    )
  );
};
