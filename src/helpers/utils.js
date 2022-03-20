const disablePastDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
};

const bodyRequest = {
  request: {
    Campaign: {
      AdCampaignCode: "",
      DealCampaignCode: "",
    },
    Filter: {
      Type: "Service",
      MustBeInAdCampaign: true,
      MustBeInDealCampaign: false,
      Bookability: {
        RateRange: {},
        BlockUnavailableResults: false,
        IncludeOnRequest: true,
        IsBookable: true,
      },
      TagCriteria: {},
    },
    Output: {
      CommonContent: {
        All: true,
      },
      Availability: {
        StartDate: new Date(),
        LowestRateOnly: true,
        MergeMethod: 2,
        NumberOfDays: 7,
      },
      AdvancedContent: true,
      Features: true,
      Rating: true,
      Reviews: {
        IncludeFullDescription: true,
        IncludeShortReview: true,
        MaxReturnCount: 10,
        MaxReturnCountSpecified: true,
      },
      Settings: true,
    },
    Paging: {
      PageNumber: 1,
      PageSize: 12,
    },
    ShortName: "TestDistributorOA",
  },
};

const quoteRequest = {
  request: {
    CurrentCurrency: "JPY",
    AdCampaignCode: "",
    IncludeCampaigns: false,
    IncludeExtras: true,
    IndustryCategoryGroup: null,
    IndustryCategory: null,
    CommencementDate: new Date(),
    Duration: 1,
    Configurations: [
      {
        Id: "",
        ProductId: "",
        Pax: {
          Adults: 2,
          Children: 0,
          Seniors: 0,
        },
      },
    ],
    Shortname: "TestDistributorOA",
  },
};

const headers = {
  "Content-Type": "application/json",
};

export { bodyRequest, headers, quoteRequest, disablePastDate };
