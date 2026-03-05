import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('CamperDive')
    .items([
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('tutorial').title('Tutorials'),
      S.documentTypeListItem('category').title('Categories'),
    ])
