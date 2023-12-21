/**
 * Convert html class syntax given as undefined, string ("text-base bg-primary") or
 * object syntax ({"text-base bg-primary": true}) always to object syntax ({"text-base bg-primary": true}).
 *
 * @param classes
 */
export function classesToObjectSyntax(classes: string | undefined | Record<string, boolean>): Record<string, boolean> {
    if (typeof classes === 'object') {
        return classes;
    }

    if (classes === undefined) {
        return {};
    }

    return {
        [classes]: true,
    };
}

/**
 * Convert the given enum to a string for documentation.
 *
 * @param value
 * @param className
 */
export function enumToPlainText(value: object, className: string) {
  let text =  `enum ${className} {\n`;

  Object.keys(value).forEach((key) => {
    text += `    ${key} = '${value[key]}',\n`;
  })

  return text + '}';
}
