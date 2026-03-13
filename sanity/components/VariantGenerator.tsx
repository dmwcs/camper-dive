'use client'

import {Button, Stack} from '@sanity/ui'
import {AddIcon} from '@sanity/icons'
import {randomKey} from '@sanity/util/content'
import {type ArrayOfObjectsInputProps, type ObjectItemProps, set, useFormValue} from 'sanity'
import {useCallback} from 'react'

export function LockedVariantItem(props: ObjectItemProps) {
  return (
    <div className="locked-variant-item" style={{position: 'relative'}}>
      <style>{`.locked-variant-item [data-ui="MenuButton"] { display: none !important; }`}</style>
      {props.renderDefault(props)}
    </div>
  )
}

interface Option {
  name: string
  values: string[]
}

interface Variant {
  _key: string
  _type: string
  label: string
  price?: number
  stock?: number
  stripePriceId?: string
}

function cartesian(arrays: string[][]): string[][] {
  return arrays.reduce<string[][]>(
    (acc, values) => acc.flatMap((combo) => values.map((v) => [...combo, v])),
    [[]],
  )
}

export function VariantGenerator(props: ArrayOfObjectsInputProps) {
  const {onChange, value} = props
  const options = useFormValue(['options']) as Option[] | undefined

  const handleGenerate = useCallback(() => {
    const existing = (value as Variant[] | undefined) ?? []

    // No options → single "Default" variant
    if (!options || options.length === 0) {
      const found = existing.find((v) => v.label === 'Default')
      onChange(
        set([
          {
            _key: found?._key ?? randomKey(12),
            _type: 'object',
            label: 'Default',
            price: found?.price ?? 0,
            stock: found?.stock ?? 0,
            stripePriceId: found?.stripePriceId ?? undefined,
          },
        ]),
      )
      return
    }

    // Compute cartesian product of all option values
    const valueSets = options.map((opt) => opt.values || [])
    if (valueSets.some((s) => s.length === 0)) return

    const labels = cartesian(valueSets).map((combo) => combo.join(' / '))

    const newVariants = labels.map((label) => {
      const found = existing.find((v) => v.label === label)
      return {
        _key: found?._key ?? randomKey(12),
        _type: 'object',
        label,
        price: found?.price ?? 0,
        stock: found?.stock ?? 0,
        stripePriceId: found?.stripePriceId ?? undefined,
      }
    })

    onChange(set(newVariants))
  }, [onChange, options, value])

  return (
    <Stack space={3}>
      <Button
        icon={AddIcon}
        text="Generate Variants"
        mode="ghost"
        tone="primary"
        onClick={handleGenerate}
      />
      {props.renderDefault({...props, arrayFunctions: () => null})}
    </Stack>
  )
}
