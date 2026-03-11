import {BasketIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

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
      name: 'stripePriceId',
      title: 'Stripe Price ID',
      type: 'string',
      description: 'The Price ID from Stripe (e.g. price_1ABC...)',
      validation: (rule) => rule.required(),
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
              name: 'stripePriceId',
              type: 'string',
              title: 'Stripe Price ID',
              description: 'The Price ID from Stripe for this variant',
              validation: (rule) => rule.required(),
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
