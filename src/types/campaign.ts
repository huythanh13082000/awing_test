export interface ICampaign {
  campaign: {
    information: {
      [key: string]: any
      name: string
      describe?: string
    }
    subCampaigns: {
      name: string
      status: boolean
      ads: {
        [key: string]: any
        name: string
        quantity: number
      }[]
    }[]
  }
}
