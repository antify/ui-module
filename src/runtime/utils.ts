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
