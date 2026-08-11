import { createClient } from '@sanity/client'

import { apiVersion, dataset, isSanityConfigured, projectId } from './env'

export const client = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null
