/**
 * Helpers
 * ===
 * ### Mapping Currency
 * Mapping currency for display purposes.
 *
 * e.g. Rupiah: Rp. 50.000 => { preifx: 'Rp', separator: '.' }
 * @param {String|Number} value - Value to be converted
 * @param {Object} cfg - Configuration accept: { prefix, separator }
 */
export const mappingCurrency = (value, cfg) => {
    if (!!value || value === 0) {
        const num = parseInt(value, 10)
        const res = num
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${(cfg && cfg.separator) || '.'}`)
        .toString()

        return (cfg && cfg.prefix ? `${cfg.prefix} ` : 'Rp ') + res
    }

    return ''
}