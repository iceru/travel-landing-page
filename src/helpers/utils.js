let pageNumber = 0;

const bodyRequest = {
  ShortName: "TestDistributor",
  Output: {
    CommonContent: {
      All: true,
    },
    Availability: {
      StartDate: new Date(),
      NumberOfDays: 42,
      MergeMethod: 2,
      LowestRateOnly: true,
    },
    AdvancedContent: true,
  },
  Paging: {
    PageNumber: pageNumber,
    PageSize: 12,
    Sorting: [{ By: 0 }],
  },
  Filter: {
    Type: "Service",
    MustBeInAdCampaign: true,
    MustBeInDealCampaign: false,
  },
  Campaign: {
    AdCampaignCode: "",
    DealCampaignCode: "",
  },
};

const headers = {
  "Content-Type": "application/json",
};

export { bodyRequest, headers };
