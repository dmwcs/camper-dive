import {type SchemaTypeDefinition} from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {productType} from './productType'
import {tutorialType} from './tutorialType'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [blockContentType, categoryType, productType, tutorialType],
}
