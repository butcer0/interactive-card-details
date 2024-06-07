import { ElasticResultModel } from "../models/elastic-result.model";

export const ElasticResultMock: ElasticResultModel[] = [
  {
    ProductID: 10017413,
    ProductName: 'DKNY Unisex Black & Grey Printed Medium Trolley',
    ProductBrand: 'DKNY',
    Gender: 'Unisex',
    Price_INR: 11745,
    NumImages: 7,
    Description: 'Black and grey printed medium trolley bag, secure zip closures.',
    PrimaryColor: 'Black',
    DescriptionVector: [0.027645892, -0.0026341877, -0.0035883952, 0.001587496, 0.0059781632]
  },
  {
    ProductID: 10016283,
    ProductName: 'EthnoVogue Women Beige & Grey Made to Measure Kurta',
    ProductBrand: 'EthnoVogue',
    Gender: 'Women',
    Price_INR: 5810,
    NumImages: 7,
    Description: 'Beige & Grey made to measure kurta with churidar, perfect for casual wear.',
    PrimaryColor: 'Beige',
    DescriptionVector: [-0.024660692, -0.028755357, -0.020332495, 0.0229641, 0.01593788]
  },
  {
    ProductID: 10009781,
    ProductName: 'SPYKAR Women Pink Alexa Super Skinny Fit High-Rise Jeans',
    ProductBrand: 'SPYKAR',
    Gender: 'Women',
    Price_INR: 899,
    NumImages: 7,
    Description: 'Pink coloured wash 5-pocket high-rise cropped jeans, clean look with no fade.',
    PrimaryColor: 'Pink',
    DescriptionVector: [-0.04694326, 0.081827946, 0.048335165, -0.000314216, -0.012987123]
  },
  {
    ProductID: 10015921,
    ProductName: 'Raymond Men Blue Self-Design Single-Breasted Bandhgala Suit',
    ProductBrand: 'Raymond',
    Gender: 'Men',
    Price_INR: 5599,
    NumImages: 5,
    Description: 'Blue self-design bandhgala suit, Blue self-design formal suit.',
    PrimaryColor: 'Blue',
    DescriptionVector: [-0.015098745, -0.010285403, 0.009487283, -0.003258246, 0.007432199]
  }
];
