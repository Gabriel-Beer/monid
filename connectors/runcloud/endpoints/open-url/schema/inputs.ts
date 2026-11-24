import { z } from "zod";

/** `POST /run-cloud/{platform}/{sessionId}/open-url` body. The pattern is the
 *  vendor's own `validateServeSimOpenUrl`: no whitespace or control
 *  characters, every `%` starts a two-digit hex escape, the about:, data:,
 *  file:, javascript: and vbscript: schemes are refused (any case), and an
 *  http(s) URL needs a host. Custom app schemes pass. */
const OPEN_URL_PATTERN = new RegExp(
    "^(?![Aa][Bb][Oo][Uu][Tt]:|[Dd][Aa][Tt][Aa]:|[Ff][Ii][Ll][Ee]:" +
        "|[Jj][Aa][Vv][Aa][Ss][Cc][Rr][Ii][Pp][Tt]:" +
        "|[Vv][Bb][Ss][Cc][Rr][Ii][Pp][Tt]:)" +
        "(?![Hh][Tt][Tt][Pp][Ss]?://(?:[/?#]|$))" +
        "[A-Za-z][A-Za-z0-9+.-]*:(?:[^\\x00-\\x20\\x7f%]|%[0-9A-Fa-f]{2})+$",
);

export const zOpenUrlBody = z.object({
    url: z.string().min(1).max(4096).regex(OPEN_URL_PATTERN).describe(
        "The URL or deep link to open, e.g. 'https://example.com' in " +
            "the browser or 'myapp://settings' in an installed app.",
    ),
}).strict();
