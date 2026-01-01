export const TEMPLATES = [
    {
        id: 'hero',
        name: 'Hero Section',
        description: 'Full-width banner with heading, text, and buttons.',
        icon: 'Layout'
    },
    {
        id: 'cta',
        name: 'Call to Action',
        description: 'Attention-grabbing container with action button.',
        icon: 'MousePointer'
    },
    {
        id: 'features',
        name: 'Feature Grid',
        description: '3-column grid with icons and descriptions.',
        icon: 'Grid'
    },
    {
        id: 'split',
        name: 'Split Content',
        description: '50/50 layout with image on one side and text on the other.',
        icon: 'Columns'
    }
];

export const getTemplateCode = (templateId, framework) => {
    const isSpectra = framework === 'spectra';
    const isAstra = framework === 'astra'; // Astra mostly uses Core blocks but might default to 'alignfull' container logic

    switch (templateId) {
        case 'hero':
            if (isSpectra) {
                return `<!-- wp:uagb/container {"block_id":"hero-container","widthType":"full","bgImageType":"color","bgColor":"#1e293b","contentWidth":"alignfull","innerContentWidth":"alignwide"} -->
<div class="wp-block-uagb-container uagb-block-hero-container"><div class="uagb-container-inner-blocks-wrap"><!-- wp:uagb/container {"block_id":"hero-inner","widthType":"boxed","contentWidth":"alignwide"} -->
<div class="wp-block-uagb-container uagb-block-hero-inner"><div class="uagb-container-inner-blocks-wrap"><!-- wp:uagb/advanced-heading {"block_id":"hero-heading","headingTitle":"Build Faster with Gutenberg","headFontSize":48,"headColor":"#ffffff"} -->
<h1 class="wp-block-uagb-advanced-heading uagb-block-hero-heading" style="color:#ffffff;font-size:48px">Build Faster with Gutenberg</h1>
<!-- /wp:uagb/advanced-heading -->

<!-- wp:paragraph {"textColor":"white","fontSize":"medium"} -->
<p class="has-white-color has-text-color has-medium-font-size">Create stunning pages with the power of modern block patterns and AI-driven generation.</p>
<!-- /wp:paragraph -->

<!-- wp:uagb/buttons {"block_id":"hero-buttons","btn_count":1} -->
<div class="wp-block-uagb-buttons uagb-block-hero-buttons"><!-- wp:uagb/buttons-child {"block_id":"hero-btn-1","label":"Get Started","background":"#2563eb","color":"#ffffff"} -->
<div class="wp-block-uagb-buttons-child uagb-block-hero-btn-1"><a href="#" class="uagb-buttons-repeater">Get Started</a></div>
<!-- /wp:uagb/buttons-child --></div>
<!-- /wp:uagb/buttons --></div></div>
<!-- /wp:uagb/container --></div></div>
<!-- /wp:uagb/container -->`;
            }

            // Default / Astra
            return `<!-- wp:cover {"url":"https://placehold.co/1200x600/1e293b/FFF","dimRatio":50,"overlayColor":"black","align":"full","layout":{"type":"constrained"}} -->
<div class="wp-block-cover alignfull"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-50 has-background-dim"></span><img class="wp-block-cover__image-background" alt="" src="https://placehold.co/1200x600/1e293b/FFF" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"3rem"}}} -->
<h2 class="wp-block-heading has-text-align-center" style="font-size:3rem">Welcome to the Future</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","fontSize":"large"} -->
<p class="has-text-align-center has-large-font-size">Build visually stunning layouts in minutes using standard WordPress blocks.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"vivid-cyan-blue"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-vivid-cyan-blue-background-color has-background wp-element-button">Get Started</a></div>
<!-- /wp:button -->

<!-- wp:button {"style":{"border":{"width":"1px"}},"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline" style="border-width:1px"><a class="wp-block-button__link wp-element-button">Learn More</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:cover -->`;

        case 'cta':
            if (isSpectra) {
                return `<!-- wp:uagb/container {"block_id":"cta-box","bgColor":"#f8fafc","borderStyle":"solid","borderWidth":1,"borderColor":"#e2e8f0","borderRadius":12,"contentWidth":"alignwide","innerContentWidth":"alignwide"} -->
<div class="wp-block-uagb-container uagb-block-cta-box"><div class="uagb-container-inner-blocks-wrap"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"70%"} -->
<div class="wp-block-column" style="flex-basis:70%"><!-- wp:uagb/advanced-heading {"block_id":"cta-head","headingTitle":"Ready to optimize your workflow?","headFontSize":24} -->
<h3 class="wp-block-uagb-advanced-heading uagb-block-cta-head" style="font-size:24px">Ready to optimize your workflow?</h3>
<!-- /wp:uagb/advanced-heading -->
<!-- wp:paragraph -->
<p>Join thousands of developers building better sites today.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"30%","verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:30%"><!-- wp:uagb/buttons {"block_id":"cta-btn","align":"right"} -->
<div class="wp-block-uagb-buttons uagb-block-cta-btn"><!-- wp:uagb/buttons-child {"label":"Get Started Now","background":"#000000","color":"#ffffff"} -->
<div class="wp-block-uagb-buttons-child"><a href="#" class="uagb-buttons-repeater">Get Started Now</a></div>
<!-- /wp:uagb/buttons-child --></div>
<!-- /wp:uagb/buttons --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></div>
<!-- /wp:uagb/container -->`;
            }
            return `<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"}}},"backgroundColor":"cyan-bluish-gray","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-cyan-bluish-gray-background-color has-background" style="padding-top:3rem;padding-right:2rem;padding-bottom:3rem;padding-left:2rem"><!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns is-vertically-aligned-center"><!-- wp:column {"width":"66.66%"} -->
<div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:heading -->
<h2 class="wp-block-heading">Ready to get started?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Join our newsletter and get the latest updates directly specifically curated for you.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"33.33%"} -->
<div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:buttons {"layout":{"type":"flex","justifyContent":"right"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"black","textColor":"white"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-white-color has-black-background-color has-text-color has-background wp-element-button">Subscribe Now</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->`;

        case 'features':
            return `<!-- wp:group {"align":"full","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull"><!-- wp:heading {"textAlign":"center","style":{"spacing":{"margin":{"bottom":"2rem"}}}} -->
<h2 class="wp-block-heading has-text-align-center" style="margin-bottom:2rem">Our Core Features</h2>
<!-- /wp:heading -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"scale":"cover","sizeSlug":"full","linkDestination":"none","className":"is-style-rounded"} -->
<figure class="wp-block-image size-full is-style-rounded"><img src="https://placehold.co/64x64/2563eb/FFF?text=1" alt="" style="object-fit:cover"/></figure>
<!-- /wp:image -->
<!-- wp:heading {"level":3,"fontSize":"medium"} -->
<h3 class="wp-block-heading has-medium-font-size">Fast Performance</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Optimized for speed and efficiency using the latest tech stack.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"scale":"cover","sizeSlug":"full","linkDestination":"none","className":"is-style-rounded"} -->
<figure class="wp-block-image size-full is-style-rounded"><img src="https://placehold.co/64x64/2563eb/FFF?text=2" alt="" style="object-fit:cover"/></figure>
<!-- /wp:image -->
<!-- wp:heading {"level":3,"fontSize":"medium"} -->
<h3 class="wp-block-heading has-medium-font-size">Secure & Safe</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Built with security in mind to protect your data at all times.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"scale":"cover","sizeSlug":"full","linkDestination":"none","className":"is-style-rounded"} -->
<figure class="wp-block-image size-full is-style-rounded"><img src="https://placehold.co/64x64/2563eb/FFF?text=3" alt="" style="object-fit:cover"/></figure>
<!-- /wp:image -->
<!-- wp:heading {"level":3,"fontSize":"medium"} -->
<h3 class="wp-block-heading has-medium-font-size">24/7 Support</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Our dedicated team is always here to help you succeed.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->`;

        case 'split':
            return `<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"top":"2rem","left":"2rem"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://placehold.co/600x400/e2e8f0/1e293b?text=Feature+Image" alt=""/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading -->
<h2 class="wp-block-heading">Experience the Difference</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Leverage our advanced tools to build better websites faster. We provide the essential building blocks for your success.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button">Learn More</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->`;

        default:
            return '';
    }
};
