import {BasketIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {VariantGenerator} from '../components/VariantGenerator'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Base Price (AUD)',
      description: 'For products with variants, set this to the lowest variant price.',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'stripeProductId',
      title: 'Stripe Product ID',
      type: 'string',
      description: 'Auto-populated by sync. Do not edit manually.',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'mostPopular',
      title: 'Most Popular',
      type: 'boolean',
      description: 'Mark this product as most popular — it will show a badge on the listing.',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: {type: 'category'},
    }),
    defineField({
      name: 'shortDesc',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'media',
      title: 'Media Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        }),
        defineArrayMember({
          type: 'file',
          title: 'Video',
          options: {
            accept: 'video/*',
          },
        }),
      ],
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', title: 'Label'}),
            defineField({name: 'value', type: 'string', title: 'Value'}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'value'},
          },
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'options',
      title: 'Product Options',
      description: 'Defines the option dimensions shown as separate rows of buttons (e.g. Band Type, Tip). Leave empty for products with no selectable options.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              title: 'Option Name',
              description: 'e.g. "Band Type", "Tip", "Size"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'values',
              type: 'array',
              title: 'Option Values',
              of: [defineArrayMember({type: 'string'})],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: {title: 'name', values: 'values'},
            prepare(selection) {
              const {title, values} = selection
              return {title, subtitle: Array.isArray(values) ? values.join(', ') : ''}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'variants',
      title: 'Product Variants',
      description: 'Price lookup table. Label must match option combo key (e.g. "Latex / Single Barb"). Products with no options should have one "Default" variant.',
      type: 'array',
      components: {input: VariantGenerator},
      validation: (rule) =>
        rule.custom((variants, context) => {
          if (!variants || variants.length === 0) return true

          const doc = context.document as {
            options?: Array<{name: string; values: string[]}>
          }
          const options = doc?.options

          const labels = (variants as Array<{label?: string}>).map((v) => v.label || '')

          // Check duplicates
          const dupes = labels.filter((l: string, i: number) => labels.indexOf(l) !== i)
          if (dupes.length > 0) {
            return `Duplicate variant label(s): "${[...new Set(dupes)].join('", "')}"`
          }

          // No options → must be exactly one "Default" variant
          if (!options || options.length === 0) {
            if (labels.length !== 1 || labels[0] !== 'Default') {
              return 'Products without options must have exactly one variant labelled "Default"'
            }
            return true
          }

          // Build expected labels from cartesian product of option values
          function cartesian(arrays: string[][]): string[][] {
            return arrays.reduce<string[][]>(
              (acc, values) => acc.flatMap((combo) => values.map((v) => [...combo, v])),
              [[]],
            )
          }

          const valueSets = options.map((opt) => opt.values || [])
          const expectedLabels = valueSets.length > 0
            ? cartesian(valueSets).map((combo) => combo.join(' / '))
            : []

          const invalid = labels.filter((l: string) => !expectedLabels.includes(l))
          if (invalid.length > 0) {
            return `Invalid variant label(s): "${invalid.join('", "')}". Expected: ${expectedLabels.join(', ')}`
          }

          const missing = expectedLabels.filter((l) => !labels.includes(l))
          if (missing.length > 0) {
            return `Missing variant(s) for: ${missing.join(', ')}`
          }

          return true
        }),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Variant Label',
              description: 'e.g. "75cm", "90cm", "110cm"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'price',
              type: 'number',
              title: 'Price (AUD)',
              validation: (rule) => rule.required().positive(),
            }),
            defineField({
              name: 'stock',
              type: 'number',
              title: 'Stock',
              description: 'Available inventory for this variant.',
              initialValue: 0,
              validation: (rule) => rule.required().min(0),
            }),
            defineField({
              name: 'stripePriceId',
              type: 'string',
              title: 'Stripe Price ID',
              description: 'Auto-populated by sync. Leave blank for new variants.',
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'price'},
            prepare(selection) {
              const {title, subtitle} = selection
              return {title, subtitle: subtitle ? `$${subtitle}` : ''}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      media: 'image',
    },
    prepare(selection) {
      const {subtitle} = selection
      return {...selection, subtitle: subtitle ? `$${subtitle}` : ''}
    },
  },
})
