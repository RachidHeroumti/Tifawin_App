
 export interface Brand {
    __v: number;
    _id: string;
    description: string;
    imageSrc: string;
    name: string;
    slug: string;
    storeId: string;
  }

  export interface SortForm {
    name: string;
    type: string;
    q: number; 
  }
  export interface FilterFormat {
    brands: string[]; 
    colors: string[]; 
    sizes: string[];
    priceRange: any
  }
  export interface CartItem {
    id: string;
    quantity: number;
    price: number;
    variant?: {
      _id: string;
    };
    upsell?: {
      _id?: string;
      name?: string;
      product?: {
        _id: string;
      };
      discount?: {
        code: string;
        type: string;
        value: number;
      };
    };
  }

  export interface IProduct {
    _id: string,
    collections: any[],
    createdAt: string,
    currencies: {
        _id: string,
        currency: string,
        properties: {
            _id: string,
            name: string,
            value: string | number,
        }[],
    }[],
    description: string,
    files: any[],
    html: any,
    images: {
        _id: string,
        src: string,
        title: string,
        width: number,
        height: number,
        storeId: string,
        createdAt: string,
        updatedAt: string,
    }[],
    name: string,
    options: {
        _id: string,
        key: string | null,
        name: string,
        style: string,
        values: {
            _id: string,
            value1: string,
        }[],
    }[],
    outStock: {
        hide: boolean,
        disabled: boolean,
    },
    price: {
        buyingPrice: number,
        salePrice: number,
        comparePrice: number,
    },
    productType: string,
    quantity: {
        instock: number,
        transporting: number,
        unit: string,
        increment: number,
        default: number,
        min: number,
        max: number,
        value: number,
    },
    reference: string,
    review: {
        reviews: any[],
        rating: number,
    },
    seo: {
        hide: boolean,
        keywords: string[],
        description: string,
        title: string,
    },
    shipping: {
        active: boolean,
        price: number,
        zones: any[],
    },
    sizes: {
        weight: {
            value: number,
            unit: string,
        },
        volume: {
            value: number,
            unit: string,
        },
        dimensions: {
            width: number,
            height: number,
            depth: number,
            unit: string,
        },
    },
    slug: string,
    source: string,
    status: string,
    storeId: string,
    tags: string[],
    translates: {
        _id: string,
        language: string,
        properties: {
            _id: string,
            name: string,
            value: string,
        }[],
    }[],
    type: string,
    updatedAt: string,
    user: {
        _id: string,
        firstname: string,
        lastname: string,
        whoIs: string,
    },
    variants?: {
        _id: string,
        imageId: string,
        name: string,
        option1: {
            option: string,
            value: string,
        },
        price: {
            buyingPrice: number,
            salePrice: number,
            comparePrice: number,
        },
        quantity: {
            instock: number,
            transporting: number,
            pack: number,
        },
        sizes: {
            weight: {
                value: number,
                unite: string,
            },
            volume: {
                value: number,
                unite: string,
            },
            dimensions: {
                width: number,
                height: number,
                depth: number,
                unite: string,
            },
        },
        translates: any[],
        unavailable: boolean,
    }[],
    __v: number,
}

type Verify = {
    code: string | null;
    createdAt: string | null;
  };
  
  export interface  CustmerFormat  {
    _id: string;
    cashback: number;
    cashbackHistories: any[];
    createdAt: string;
    email: string;
    firstname: string;
    forAffiliate: boolean;
    ipAddress: string;
    isRegistred: boolean;
    isSubscriber: boolean;
    lastOrder: string;
    lastname: string;
    phone: string;
    status: "ACTIVE" | "INACTIVE" | "BANNED"; 
    storeId: string;
    toDayOrders: number;
    type: "particular" | "business"; 
    updatedAt: string;
    verify: Verify;
  };
  