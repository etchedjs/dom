/**
 * @module @etchedjs/etched
 * @copyright Lcf.vs 2020
 * @licence MIT
 * @see {@link https://github.com/etchedjs/etched|Etched on GitHub}
 * @preserve
 */
import jsdom from 'jsdom'

export default new jsdom.JSDOM('<!DOCTYPE html>').window.document
