/**
 * Simple parser to convert Gutenberg HTML comments into a JSON tree.
 * Note: This is a lightweight implementation for visualization.
 * It detects block names, attributes, and inner content.
 */

export const parseGutenbergToJSON = (content) => {
    if (!content) return [];

    const blocks = [];
    const stack = [];

    // Improved Regex:
    // 1. Matches <!-- wp:namespace/block -->
    // 2. Matches attributes (JSON object) including multi-line (using [\s\S]*?)
    // 3. Matches closing <!-- /wp:namespace/block -->
    // 4. Captures the block name and attributes

    // Global search for block delimiters
    const tokenRegex = /<!--\s+(\/?wp:[\w\/\-]+)\s*({[\s\S]*?})?\s*-->/g;

    let match;
    let lastIndex = 0;

    // We need to track text content between blocks as well (HTML nodes)
    // For this simple parser, we'll focus on the block structure.

    while ((match = tokenRegex.exec(content)) !== null) {
        const fullTag = match[0];
        const tagName = match[1]; // e.g. "wp:paragraph" or "/wp:paragraph"
        const attributesFn = match[2]; // e.g. {"textColor":"red"} or undefined

        // Check if closing tag
        if (tagName.startsWith('/')) {
            const closingBlockName = tagName.replace('/wp:', ''); // e.g. "paragraph"

            // Attempt to close the last matching block from stack
            // We look backwards for the matching opener (strictly, it should be the top of stack)
            if (stack.length > 0) {
                const lastBlock = stack[stack.length - 1];
                // Simplified check: just pop. 
                // In a real parser we'd verify names match.
                stack.pop();

                if (stack.length > 0) {
                    stack[stack.length - 1].innerBlocks.push(lastBlock);
                } else {
                    blocks.push(lastBlock);
                }
            }
        } else {
            // Opening tag
            const blockName = tagName.replace('wp:', '');
            let attributes = null;

            if (attributesFn) {
                try {
                    attributes = JSON.parse(attributesFn);
                } catch (e) {
                    console.warn('Failed to parse attributes for block', blockName, e);
                    attributes = { _error: 'Invalid JSON attributes' };
                }
            }

            const newBlock = {
                blockName: blockName.includes('/') ? blockName : `core/${blockName}`,
                attrs: attributes,
                innerBlocks: [],
                innerHTML: '' // InnerHTML would be the content between this tag and the next tag or closing tag
            };

            stack.push(newBlock);
        }
    }

    // If stack is not empty (unbalanced), push remainders to blocks
    while (stack.length > 0) {
        const orphan = stack.pop();
        if (stack.length > 0) {
            stack[stack.length - 1].innerBlocks.push(orphan);
        } else {
            blocks.push(orphan);
        }
    }

    return blocks;
};
