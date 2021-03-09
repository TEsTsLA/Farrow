export type JsonType =
  | number
  | string
  | boolean
  | null
  | undefined
  | JsonType[]
  | {
      toJSON(): string
    }
  | {
      [key: string]: JsonType
    }

/**
 * {@label BoId}
 */
export type BoId = {
  /**
   * @remarks Todo id
   */
  id: number
}

export type CreateApiClientOptions = {
  /**
   * a fetcher for api-client
   */
  fetcher: (input: { path: string[]; input: JsonType }) => Promise<JsonType>
}

export const createApiClient = (options: CreateApiClientOptions) => {
  return {
    /**
     * @remarks remove todo
     */
    getList: (input: BoId) => options.fetcher({ path: ['getList'], input }) as Promise<any>,
  }
}
