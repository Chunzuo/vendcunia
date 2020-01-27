export class Category {
  constructor(public id: number,
              public name: string,
              public has_sub_category: boolean,
              public parent_id: number) {}
}

export class Product {
  public id: number;
  public title: string;
  public name: string;
  public sub_title: string;
  public condition_desc: string;
  public images: Array<any>;
  public starting_price: number;
  public current_price: number;
  public discount_price: number;
  public ratings_count: number;
  public ratings_value: number;
  public description: string;
  public quantity: number;
  public color: Array<string>;
  public size: Array<string>;
  public weight: number;
  public category_id: number;
  public thumnail_image: string;
  public remain_second: string;
  public created_by: number;
  public seller_name: string;
  public seller_email: string;
  public selling_format: number;
  public promotion_name: string;
  public category_name: string;
  public internal_shipping_type: string;
  public domestic_shipping_type: string;
  public domestic_service_type: string;
  public created_on: string;
  public package_dimens_x: number;
  public package_dimens_y: number;
  public package_dimens_z: number;
  public weight_lbs: number;
  public weight_oz: number;

  constructor() {}
}

export class Message {
  public id: number;
  public senderId: number;
  public receiverId: number;
  public senderName: string;
  public receiverName: string;
  public title: string;
  public content: string;
  public senderTime: string;
  public checked: boolean;
  constructor() {}
}

export class Order {
  public rowIdx: number;
  public id: number;
  public sellerId: number;
  public buyerId: number;
  public productId: number;
  public productName: number;
  public orderingPrice: number;
  public productPrice: number;
  public quantity: number;
  public ordererEmail: string;
  public status: number;
  public statusText: string;
  public orderedAt: string;
  public sellerFeedbackId: number;
  public sellerRating: number;
  public sellerFeedback: string;
  public buyerFeedbackId: number;
  public buyerRating: number;
  public buyerFeedback: string;

  constructor() {}
}

export class Bid {
  public productName: string;
  public buyerName: string;
  public bidAmount: number;
  public bidTime: string;

  constructor() {}
}
