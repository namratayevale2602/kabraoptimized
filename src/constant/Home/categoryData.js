import * as images from "../../assets/index";

export const categoryData = {
  sarees: {
    title: "Sarees Collection",
    description: "Premium silk sarees for all occasions.",
    subCategories: [
      {
        name: "Kanchipuram Sarees",
        children: [
          {
            name: "Kanchipuram Pure Silk Sarees",
            slug: "kanchipuram-pure-silk",
            products: [
              {
                id: 1,
                name: "Golden Zari Kanchipuram Saree",

                images: [
                  images.kachipuramsilkmodellightgreen,
                  images.kachipuram2,
                  images.kachipuram2a,
                  images.kachipuram2b,
                ],
              },
              {
                id: 2,
                name: "Peacock Motif Kanchipuram",

                images: [
                  images.kachipuramsilkmodelnavyblue,
                  images.kachipuram3,
                  images.kachipuram3a,
                  images.kachipuram3b,
                ],
              },
              {
                id: 3,
                name: "Maroon Traditional Kanchipuram",

                images: [
                  images.kachipuramsilkmodelgreen,
                  images.kachipuram4,
                  images.kachipuram4a,
                  images.kachipuram4b,
                  images.kachipuram4c,
                ],
              },
              {
                id: 4,
                name: "Maroon Traditional Kanchipuram",

                images: [
                  images.kachipuramsilkmodelpurple,
                  images.kachipuram5,
                  images.kachipuram5a,
                  images.kachipuram5b,
                  images.kachipuram5c,
                ],
              },
            ],
          },
          {
            name: "Kanchipuram Pure Half Fine Jari",
            slug: "kanchipuram-half-fine-jari",
            products: [
              {
                id: "kphj001",
                name: "Half Fine Jari Temple Border",
                images: [
                  images.kachipuramhalffinejarimodel,
                  images.kachipuram2jari,
                  images.kachipuram2jari1,
                ],
              },
              {
                id: "kphj002",
                name: "Floral Motif Half Jari",
                images: [
                  images.kachipurammodelred,
                  images.kachipurambrocket1,
                  images.kanchipurambrocket1a,
                  images.kanchipurambrocket1b,
                  images.kanchipurambrocket1c,
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Banarasi Sarees",
        children: [
          {
            name: "Banarasi Silk Sarees",
            slug: "banarasi-silk",
            products: [
              {
                id: 1,
                name: "Heavy Brocade Banarasi Silk",
                images: [images.banarasisilks1],
              },
              {
                id: 2,
                name: "Butidar Banarasi Silk",
                images: [images.banarasisilks2],
              },
              {
                id: 3,
                name: "Butidar Banarasi Silk",
                images: [images.banarasisilks3],
              },
              {
                id: 4,
                name: "Butidar Banarasi Silk",
                images: [images.banarasisilks4],
              },
              {
                id: 5,
                name: "Butidar Banarasi Silk",
                images: [images.banarasisilks5],
              },
              {
                id: 6,
                name: "Butidar Banarasi Silk",
                images: [images.banarasisilks6],
              },
              {
                id: 7,
                name: "Butidar Banarasi Silk",
                images: [images.banarasisilks7],
              },
            ],
          },
          {
            name: "Banarasi Kadhwa Sarees",
            slug: "banarasi-kadhwa",
            images: [images.BanarasiKadhwa],
            products: [
              {
                id: "bks001",
                name: "Traditional Kadhwa Weave",
                images: [images.BanarasiKadhwa],
              },
            ],
          },
          {
            name: "Banarasi Tussar Weaving",
            slug: "banarasi-tussar",
            images: [images.PureTussarEmbroidery],
            products: [
              {
                id: "btw001",
                name: "Tussar Silk Banarasi",
                images: [images.PureTussarEmbroidery],
              },
            ],
          },
          {
            name: "Banarasi Organza",
            slug: "banarasi-organza",
            products: [
              {
                id: "bo001",
                name: "Organza Banarasi Saree",
                images: [
                  images.banarasiorganzamodel,
                  images.banarasiorganza,
                  images.banarasiorganzaa1,
                ],
              },
            ],
          },
          {
            name: "Banarasi Georgette Saree",
            slug: "banarasi-georgette",
            products: [
              {
                id: 1,
                name: "Georgette Banarasi Saree",
                images: [
                  images.banarasigeoegettemodelyello,
                  images.banarsigeorgette1,
                ],
              },
              {
                id: 2,
                name: "Georgette Banarasi Saree",
                images: [
                  images.banarasigeoegettemodel,
                  images.banarsigeorgette2,
                ],
              },
              {
                id: 3,
                name: "Georgette Banarasi Saree",
                images: [
                  images.banarasigeoegettemodelred,
                  images.banarsigeorgette3,
                ],
              },
              {
                id: 4,
                name: "Georgette Banarasi Saree",
                images: [
                  images.banarasigeoegettemodelblue,
                  images.banarsigeorgette4,
                ],
              },
              {
                id: 5,
                name: "Georgette Banarasi Saree",
                images: [images.banarsigeorgette5],
              },
            ],
          },
          {
            name: "Banarasi Tissue Saree",
            slug: "banarasi-tissue",
            products: [
              {
                id: 1,
                name: "Tissue Silk Banarasi",
                images: [
                  images.banarasitiisuemodel,
                  images.banarasitissues,
                  images.banarasitissues1,
                ],
              },
              // {
              //   id: 2,
              //   name: "Tissue Silk Banarasi",
              //   images: [images.banarasitissues1],
              // },
            ],
          },
        ],
      },
      {
        name: "Designer Sarees",
        children: [
          {
            name: "Pure Designer Embroidery Saree",
            slug: "pure-designer-embroidery",
            products: [
              {
                id: 1,
                name: "Contemporary Designer Saree",
                images: [
                  images.desginersaree2,
                  images.desiner1,
                  images.desiner1a,
                  images.desiner1b,
                ],
              },
              {
                id: 2,
                name: "Contemporary Designer Saree",
                images: [images.desiner2a, images.desiner2b, images.desiner2c],
              },
              {
                id: 3,
                name: "Contemporary Designer Saree",
                images: [
                  images.desginerSreee3,
                  images.desiner3,
                  images.desiner3a,
                ],
              },
            ],
          },
          {
            name: "Fancy Sarees",
            slug: "fancy-sarees",
            products: [
              {
                id: "fs001",
                name: "Sequinned Fancy Saree",
                images: [images.FancySaree],
              },
            ],
          },
          {
            name: "Organza Sarees",
            slug: "organza-sarees",
            products: [
              {
                id: 1,
                name: "Embroidered Organza Saree",
                images: [images.organzamodel, images.organza, images.organza1],
              },
              {
                id: 2,
                name: "Embroidered Organza Saree",
                images: [images.organza2],
              },
              {
                id: 3,
                name: "Embroidered Organza Saree",
                images: [images.organza3],
              },
              {
                id: 4,
                name: "Embroidered Organza Saree",
                images: [images.organza4],
              },
              {
                id: 5,
                name: "Embroidered Organza Saree",
                images: [images.organza5],
              },
              {
                id: 6,
                name: "Embroidered Organza Saree",
                images: [images.organza6],
              },
              {
                id: 7,
                name: "Embroidered Organza Saree",
                images: [images.organza7],
              },
              {
                id: 8,
                name: "Embroidered Organza Saree",
                images: [images.organza8],
              },
              {
                id: 9,
                name: "Embroidered Organza Saree",
                images: [images.organza9],
              },
              {
                id: 10,
                name: "Embroidered Organza Saree",
                images: [images.organza10],
              },
            ],
          },
          {
            name: "Bandhani Sarees",
            slug: "bandhani-sarees",
            products: [
              {
                id: "bs001",
                name: "Traditional Bandhani Saree",
                images: [images.BandhaniSaree],
              },
            ],
          },
          {
            name: "Fancy Weaving Saree",
            slug: "fancy-weaving",
            products: [
              {
                id: "fw001",
                name: "Innovative Weave Saree",
                images: [images.banarasikadhwa, images.banarasikadhwa1],
              },
            ],
          },
          {
            name: "Pure Tussar Embroidery Sarees",
            slug: "pure-tussar-embroidery",
            products: [
              {
                id: "pte001",
                name: "Tussar Silk Embroidered",
                images: [images.PureTussarEmbroidery],
              },
            ],
          },
          {
            name: "Ready To Wear Saree",
            slug: "ready-to-wear",
            products: [
              {
                id: "rtw001",
                name: "Pre-Draped Saree",
                images: [images.banarasikadhwa, images.banarasikadhwa1],
              },
            ],
          },
        ],
      },
      {
        name: "Pure Handloom Silk Saree",
        children: [
          {
            name: "Handloom Sarees",
            slug: "handloom-sarees",
            products: [
              {
                id: 1,
                name: "Traditional Handloom Silk",
                images: [
                  images.purehandloommodelblue,
                  images.handloom1,
                  images.handloom1a,
                  images.handloom1b,
                  images.handloom1c,
                ],
              },
              {
                id: 2,
                name: "Traditional Handloom Silk",
                images: [
                  images.purehandloommodelmarron,
                  images.handloom2,
                  images.handloom2a,
                  images.handloom2b,
                  images.handloom2c,
                ],
              },
              {
                id: 3,
                name: "Traditional Handloom Silk",
                images: [
                  images.purehandloommodelnavyblue,
                  images.handloom3,
                  images.handloom3a,
                  images.handloom3b,
                  images.handloom3c,
                ],
              },
              {
                id: 4,
                name: "Traditional Handloom Silk",
                images: [
                  images.purehandloommodelpink,
                  images.handloom4,
                  images.handloom4a,
                  images.handloom4b,
                  images.handloom4c,
                ],
              },
              {
                id: 5,
                name: "Traditional Handloom Silk",
                images: [
                  images.purehandloommodelgray,
                  images.handloom5,
                  images.handloom5a,
                  images.handloom5b,
                  images.handloom5c,
                ],
              },
            ],
          },
          {
            name: "Gadwal Silk",
            slug: "gadwal-silk",
            products: [
              {
                id: 1,
                name: "Gadwal Cotton Silk",
                images: [images.gadwalhandloomsilk],
              },
              {
                id: 2,
                name: "Gadwal Cotton Silk",
                images: [images.gadwalhandloomsilk1],
              },
              {
                id: 3,
                name: "Gadwal Cotton Silk",
                images: [images.gadwalhandloomsilk2],
              },
              {
                id: 4,
                name: "Gadwal Cotton Silk",
                images: [images.gadwalhandloomsilk3],
              },
              {
                id: 5,
                name: "Gadwal Cotton Silk",
                images: [images.gadwalhandloomsilk4],
              },
              {
                id: 6,
                name: "Gadwal Cotton Silk",
                images: [images.gadwalhandloomsilk5],
              },
              {
                id: 7,
                name: "Gadwal Cotton Silk",
                images: [images.gadwalhandloomsilk6],
              },
              {
                id: 8,
                name: "Gadwal Cotton Silk",
                images: [images.gadwalhandloomsilk7],
              },
              {
                id: 9,
                name: "Gadwal Cotton Silk",
                images: [images.gadwalhandloomsilk8],
              },
              {
                id: 10,
                name: "Gadwal Cotton Silk",
                images: [images.gadwalhandloomsilk9],
              },
              {
                id: 11,
                name: "Gadwal Cotton Silk",
                images: [images.gadwalhandloomsilk10],
              },
              {
                id: 12,
                name: "Gadwal Cotton Silk",
                images: [images.gadwalhandloomsilk11],
              },
              {
                id: 13,
                name: "Gadwal Cotton Silk",
                images: [images.gadwalhandloomsilk12],
              },
            ],
          },
          {
            name: "Paithani Sarees",
            slug: "paithani-sarees",
            products: [
              {
                id: 1,
                name: "Traditional Paithani",
                images: [images.handloompaithani1],
              },
              {
                id: 2,
                name: "Traditional Paithani",
                images: [images.handloompaithani2, images.handloompaithani2a],
              },
              {
                id: 3,
                name: "Traditional Paithani",
                images: [images.handloompaithani3, images.handloompaithani3a],
              },
              {
                id: 4,
                name: "Traditional Paithani",
                images: [
                  images.handloompaithaniself1,
                  images.handloompaithaniself1a,
                ],
              },
            ],
          },
          {
            name: "Chanderi Saree",
            slug: "chanderi-saree",
            products: [
              {
                id: 1,
                name: "Lightweight Chanderi",
                images: [images.chanderimodelblue, images.chanderi1],
              },
              {
                id: 2,
                name: "Lightweight Chanderi",
                images: [images.chanderimodelpurple, images.chanderi2],
              },
              {
                id: 3,
                name: "Lightweight Chanderi",
                images: [images.chanderi3],
              },
              {
                id: 4,
                name: "Lightweight Chanderi",
                images: [images.chanderi4],
              },
              {
                id: 5,
                name: "Lightweight Chanderi",
                images: [images.chanderi5],
              },
              {
                id: 6,
                name: "Lightweight Chanderi",
                images: [images.chanderimodeldarkgreen, images.chanderi6],
              },
              {
                id: 7,
                name: "Lightweight Chanderi",
                images: [images.chanderimodeldarkpurple, images.chanderi7],
              },
              {
                id: 8,
                name: "Lightweight Chanderi",
                images: [images.chanderi8],
              },
              {
                id: 9,
                name: "Lightweight Chanderi",
                images: [images.chanderimodelpink, images.chanderi9],
              },
            ],
          },
          {
            name: "Chanderi Tissue",
            slug: "chanderi-tissue",
            products: [
              {
                id: 1,
                name: "Lightweight Chanderi",
                images: [images.chanderitissue],
              },
              {
                id: 2,
                name: "Lightweight Chanderi",
                images: [images.chanderitissue1],
              },
              {
                id: 3,
                name: "Lightweight Chanderi",
                images: [images.chanderitissue2],
              },
              {
                id: 4,
                name: "Lightweight Chanderi",
                images: [images.chanderitissue3],
              },
              {
                id: 5,
                name: "Lightweight Chanderi",
                images: [images.chanderitissue4],
              },
              {
                id: 6,
                name: "Lightweight Chanderi",
                images: [images.chanderitissue5],
              },
              {
                id: 7,
                name: "Lightweight Chanderi",
                images: [images.chanderitissue6],
              },
              {
                id: 8,
                name: "Lightweight Chanderi",
                images: [images.chanderitissue7],
              },
              {
                id: 9,
                name: "Lightweight Chanderi",
                images: [images.chanderitissue8],
              },
            ],
          },
          {
            name: "Ikkat & Patola Saree",
            slug: "ikkat-patola",
            products: [
              {
                id: 1,
                name: "Double Ikkat Saree",
                images: [images.ikkat1],
              },
              {
                id: 2,
                name: "Double Ikkat Saree",
                images: [images.ikkat2],
              },
              {
                id: 3,
                name: "Double Ikkat Saree",
                images: [images.ikkat3],
              },
              {
                id: 4,
                name: "Double Ikkat Saree",
                images: [images.ikkat4],
              },
              {
                id: 5,
                name: "Double Ikkat Saree",
                images: [images.ikkat5],
              },
              {
                id: 6,
                name: "Double Ikkat Saree",
                images: [images.ikkat6],
              },
              {
                id: 7,
                name: "Double Ikkat Saree",
                images: [images.ikkat7],
              },
              {
                id: 8,
                name: "Double Ikkat Saree",
                images: [images.ikkat8],
              },
              {
                id: 9,
                name: "Double Ikkat Saree",
                images: [images.ikkat9],
              },
              {
                id: 10,
                name: "Double Ikkat Saree",
                images: [images.ikkat10],
              },
              {
                id: 11,
                name: "Double Ikkat Saree",
                images: [images.ikkat11],
              },
            ],
          },
          {
            name: "Soft Silk Saree",
            slug: "soft-silk",
            products: [
              {
                id: 1,
                name: "Keta Silk Traditional",
                images: [
                  images.softsilkmodelnavyblue,
                  images.softsilk1,
                  images.softsilk1a,
                ],
              },
              {
                id: 2,
                name: "Keta Silk Traditional",
                images: [
                  images.softsilkmodelgreen,
                  images.softsilk2,
                  images.softsilk2a,
                ],
              },
              {
                id: 3,
                name: "Keta Silk Traditional",
                images: [images.softsilk3, images.softsilk3a],
              },
              {
                id: 4,
                name: "Keta Silk Traditional",
                images: [
                  images.softsilkmodelyellow,
                  images.softsilk4,
                  images.softsilk4a,
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Printed Saree",
        children: [
          {
            name: "Designer Printed Saree",
            slug: "designer-printed",
            products: [
              {
                id: "dp001",
                name: "Contemporary Print Saree",
                images: [
                  images.banarasisilk,
                  images.banarasisilk1,
                  images.banarasisilk3,
                ],
              },
            ],
          },
          {
            name: "Tussar Printed Saree",
            slug: "tussar-printed",
            products: [
              {
                id: "tp001",
                name: "Printed Tussar Silk",
                images: [images.banarasikadhwa, images.banarasikadhwa1],
              },
            ],
          },
          {
            name: "Kalamkari Silk Saree",
            slug: "kalamkari-silk",
            products: [
              {
                id: 1,
                name: "Hand-Painted Kalamkari",
                images: [images.kalamkarimodelbrown, images.kalamkari1],
              },
              {
                id: 2,
                name: "Hand-Painted Kalamkari",
                images: [images.kalamkarimodelgray, images.kalamkari2],
              },
              {
                id: 3,
                name: "Hand-Painted Kalamkari",
                images: [images.kalamkarimodelblack, images.kalamkari3],
              },
              {
                id: 4,
                name: "Hand-Painted Kalamkari",
                images: [images.kalamkarimodelgreen, images.kalamkari4],
              },
            ],
          },
          {
            name: "Silk Printed Saree",
            slug: "silk-printed",
            products: [
              {
                id: 1,
                name: "Printed Pure Silk",
                images: [images.printed1],
              },
              {
                id: 2,
                name: "Printed Pure Silk",
                images: [images.silkprontedpurple, images.printed2],
              },
              {
                id: 3,
                name: "Printed Pure Silk",
                images: [images.printed3],
              },
              {
                id: 4,
                name: "Printed Pure Silk",
                images: [images.printed4],
              },
              {
                id: 5,
                name: "Printed Pure Silk",
                images: [images.printed5],
              },
            ],
          },
        ],
      },
      {
        name: "Occasion",
        children: [
          {
            name: "Wedding Saree",
            slug: "wedding-saree",
            images: [
              images.banarasisilk,
              images.banarasisilk1,
              images.banarasisilk3,
            ],
            products: [
              {
                id: "ws001",
                name: "Bridal Wedding Saree",
                description: "Heavy work saree for bridal wear",
                price: "₹52,999",
                images: [
                  images.banarasisilk,
                  images.banarasisilk1,
                  images.banarasisilk3,
                ],
                features: ["Bridal", "Heavy Work", "Red Traditional", "Zari"],
              },
            ],
          },
          {
            name: "Festive Wear Saree",
            slug: "festive-wear",
            products: [
              {
                id: "fw001",
                name: "Diwali Festival Saree",
                images: [images.banarasikadhwa, images.banarasikadhwa1],
              },
            ],
          },
          {
            name: "Party Wear Saree",
            slug: "party-wear-saree",
            products: [
              {
                id: "pw001",
                name: "Cocktail Party Saree",
                images: [images.banarasikadhwa, images.banarasikadhwa1],
              },
            ],
          },
          {
            name: "Mehendi Sarees",
            slug: "mehendi-sarees",
            products: [
              {
                id: "ms001",
                name: "Bright Mehendi Saree",
                images: [images.banarasikadhwa, images.banarasikadhwa1],
              },
            ],
          },
          {
            name: "Reception sarees",
            slug: "reception-sarees",
            products: [
              {
                id: "rs001",
                name: "Reception Banarasi",
                images: [images.banarasikadhwa, images.banarasikadhwa1],
              },
            ],
          },
          {
            name: "Haldi Sarees",
            slug: "haldi-sarees",
            products: [
              {
                id: "hs001",
                name: "Yellow Haldi Ceremony Saree",
                images: [images.banarasikadhwa, images.banarasikadhwa1],
              },
            ],
          },
        ],
      },
    ],
  },
  lehengas: {
    title: "Lehenga Collection",
    description: "Premium lehengas for weddings & celebrations.",
    subCategories: [
      {
        name: "Style",
        children: [
          {
            name: "Ready To Ship",
            slug: "ready-to-ship-lehenga",
            products: [
              {
                id: 1,
                name: "Ready Red Bridal Lehenga",
                images: [images.ready_to_wear],
              },{
                id: 2,
                name: "Ready Red Bridal Lehenga",
                images: [images.ready_to_wear1],
              },
            ],
          },
          {
            name: "Bridal Lehenga",
            slug: "bridal-lehenga",
            products: [
              {
                id: 1,
                name: "Royal Red Bridal Lehenga",
                images: [images.bridallehenga],
              },
              {
                id:2,
                name: "Royal Red Bridal Lehenga",
                images: [ images.bridallehenga1],
              },
            ],
          },
          {
            name: "Designer Lehenga",
            slug: "designer-lehenga",
            products: [
              {
                id: 1,
                name: "Contemporary Designer Lehenga",
                images: [images.designerlehenga],
              },{
                id: 2,
                name: "Contemporary Designer Lehenga",
                images: [images.designerlehenga1],  
              },
            ],
          },
          {
            name: "Jacket Lehenga",
            slug: "jacket-lehenga",
            products: [
              {
                id: 1,
                name: "Jacket Style Lehenga",
                images: [images.receptionlehenga],
              },{
                id: 2,
                name: "Jacket Style Lehenga",
                images: [images.weddinglehenga1],
              },
            ],
          },
          {
            name: "Bridesmaids Lehenga",
            slug: "bridesmaids-lehenga",
            products: [
              {
                id: 1,
                name: "Bridesmaid Collection",
                images: [images.bridesmaids],
              },{
                id: 2,
                name: "Bridesmaid Collection",
                images: [images.bridesmaids1],
              },
            ],
          },
          {
            name: "Crop Top Lehenga",
            slug: "crop-top-lehenga",
            products: [
              {
                id: 1,
                name: "Modern Crop Top Lehenga",
                images: [images.croptoplehenga],
              },{
                id: 2,
                name: "Modern Crop Top Lehenga",
                images: [images.croptoplehenga1],
              },
            ],
          },
          {
            name: "Bandhani Lehenga",
            slug: "bandhani-lehenga",
            products: [
              {
                id: 1,
                name: "Traditional Bandhani Lehenga",
                images: [images.bandhanilehenga],
              }, {
                id: 2,
                name: "Traditional Bandhani Lehenga",
                images: [images.bandhanilehenga1],
              },
            ],
          },
          {
            name: "Fishcut Lehenga",
            slug: "fishcut-lehenga",
            products: [
              {
                id: 1,
                name: "Mermaid Fishcut Lehenga",
                images: [images.fishcutlehenga],
              },{
                id: 1,
                name: "Mermaid Fishcut Lehenga",
                images: [images.fishcutlehenga1],
              },
            ],
          },
        ],
      },
      {
        name: "Occasions",
        children: [
          {
            name: "Wedding Lehenga",
            slug: "wedding-lehenga",
            products: [
              {
                id: "wl001",
                name: "Grand Wedding Lehenga",
                images: [images.weddinglehenga, images.weddinglehenga1],
              },
            ],
          },
          {
            name: "Reception Lehenga",
            slug: "reception-lehenga",
            products: [
              {
                id: "rl001",
                name: "Elegant Reception Lehenga",
                images: [images.receptionlehenga, images.receptionlehenga1],
              },
            ],
          },
          {
            name: "Party Wear Lehenga",
            slug: "party-wear-lehenga",
            products: [
              {
                id: "pwl001",
                name: "Cocktail Party Lehenga",
                images: [images.partywearlehenga, images.partywearlehenga1],
              },
            ],
          },
          {
            name: "Mehendi Lehenga",
            slug: "mehendi-lehenga",
            products: [
              {
                id: "ml001",
                name: "Bright Mehendi Lehenga",
                images: [images.mehendilehenga, images.mehendilehenga2],
              },
            ],
          },
          {
            name: "Sangeet Lehenga",
            slug: "sangeet-lehenga",
            products: [
              {
                id: "sl001",
                name: "Dance-Friendly Sangeet Lehenga",
                images: [images.sangeetlehenga, images.sangeetlehenga1],
              },
            ],
          },
          {
            name: "Engagement Lehenga",
            slug: "engagement-lehenga",
            products: [
              {
                id: "el001",
                name: "Engagement Ceremony Lehenga",
                images: [images.engagementlehenga, images.engagementlehenga1],
              },
            ],
          },
        ],
      },
    ],
  },
  salwarsuite: {
    title: "Salwar Suits",
    description: "Traditional and designer Salwar Suits for every occasion.",
    subCategories: [
      {
        name: "Style",
        children: [
          {
            name: "Readymade Suites",
            slug: "readymade-suites",
            products: [
              {
                id: 1,
                name: "Ready-to-Wear Suit Set",
                images: [images.palazzosuit],
              },{
                id: 2,
                name: "Ready-to-Wear Suit Set",
                images: [ images.palazzosuit],
              },
            ],
          },
          {
            name: "Anarkali",
            slug: "anarkali",
            products: [
              {
                id: 1,
                name: "Floor-Length Anarkali",
                images: [images.anarkalidress],
              },{
                id: 2,
                name: "Floor-Length Anarkali",
                images: [ images.anarkalidress1],
              },
            ],
          },
          {
            name: "Straight Cut Suit",
            slug: "straight-cut",
            products: [
              {
                id: 1,
                name: "Straight Cut Suit Set",
                images: [images.straightcut],
              }, {
                id: 2,
                name: "Straight Cut Suit Set",
                images: [images.straightcut1],
              },
            ],
          },
          {
            name: "Sharara Suit",
            slug: "sharara-suit",
            products: [
              {
                id: 1,
                name: "Traditional Sharara Set",
                images: [images.shararasuit],
              },{
                id: 2,
                name: "Traditional Sharara Set",
                images: [ images.shararasuit1],
              },
            ],
          },
          {
            name: "Palazzo Suit",
            slug: "palazzo-suit",
            products: [
              {
                id: 1,
                name: "Modern Palazzo Suit",
                images: [images.palazzosuit],
              },{
                id: 2,
                name: "Modern Palazzo Suit",
                images: [ images.palazzosuit1],
              },
            ],
          },
        ],
      },
      {
        name: "Plus Size & Special",
        children: [
          {
            name: "Plus Size Salwar Kameez",
            slug: "plus-size",
            products: [
              {
                id: 1,
                name: "Plus Size Anarkali",
                images: [images.plussize],
              }, {
                id: 2,
                name: "Plus Size Anarkali",
                images: [images.plussize1],
              },
            ],
          },
          {
            name: "Indowestern",
            slug: "indowestern",
            products: [
              {
                id: 1,
                name: "Fusion Indowestern Suit",
                images: [images.indowestern],
              },{
                id: 2,
                name: "Fusion Indowestern Suit",
                images: [ images.indowestern1],
              },
            ],
          },
          {
            name: "Evening Look",
            slug: "evening-look",
            products: [
              {
                id: 1,
                name: "Evening Gown Suit",
                images: [images.eveninglook],
              },{
                id: 2,
                name: "Evening Gown Suit",
                images: [ images.eveninglook1],
              },
            ],
          },
          {
            name: "Bridal Gowns",
            slug: "bridal-gowns",
            products: [
              {
                id: 1,
                name: "Bridal Gown Suit",
                images: [images.bridalgowns],
              },{
                id: 2,
                name: "Bridal Gown Suit",
                images: [ images.bridalgowns1],
              },
            ],
          },
        ],
      },
      {
        name: "Unstitched Salwars",
        children: [
          {
            name: "Embroidery Unstitched Salwars",
            slug: "embroidery-unstitched",
            products: [
              {
                id: 1,
                name: "Embroidered Unstitched Set",
                images: [images.embroideryunstitched],
              },{
                id: 2,
                name: "Embroidered Unstitched Set",
                images: [images.embroideryunstitched1],
              },
            ],
          },
          {
            name: "Cotton Unstitched Salwars",
            slug: "cotton-unstitched",
            products: [
              {
                id: 1,
                name: "Pure Cotton Unstitched",
                images: [images.cottonsalwar],
              },{
                id: 2,
                name: "Pure Cotton Unstitched",
                images: [ images.cottonsalwar1],
              },
            ],
          },
          {
            name: "Banarasi Unstitched Salwars",
            slug: "banarasi-unstitched",
            products: [
              {
                id: 1,
                name: "Banarasi Silk Unstitched",
                images: [images.banarasisalwar],
              },{
                id: 2,
                name: "Banarasi Silk Unstitched",
                images: [ images.banarasisalwar1],
              },
            ],
          },
          {
            name: "Paithani Unstitched Salwars",
            slug: "paithani-unstitched",
            products: [
              {
                id: 1,
                name: "Paithani Unstitched Fabric",
                images: [images.paithaniunstitched],
              },{
                id: 2,
                name: "Paithani Unstitched Fabric",
                images: [ images.paithaniunstitched1],
              },
            ],
          },
        ],
      },
    ],
  },
};

// Helper function to find subcategory by slug
export const getSubCategoryBySlug = (slug) => {
  for (const category in categoryData) {
    const categoryItem = categoryData[category];
    for (const subCategory of categoryItem.subCategories) {
      for (const child of subCategory.children) {
        if (child.slug === slug) {
          return {
            ...child,
            categoryTitle: categoryItem.title,
            subCategoryName: subCategory.name,
          };
        }
      }
    }
  }
  return null;
};

// Helper function to find product by slug (alias for backward compatibility)
export const getProductDataBySlug = (slug) => {
  return getSubCategoryBySlug(slug);
};

// Helper function to find product by ID
export const getProductById = (productId) => {
  for (const category in categoryData) {
    const categoryItem = categoryData[category];
    for (const subCategory of categoryItem.subCategories) {
      for (const child of subCategory.children) {
        if (child.products) {
          const product = child.products.find((p) => p.id === productId);
          if (product) {
            return {
              ...product,
              categoryTitle: categoryItem.title,
              subCategoryName: subCategory.name,
              subCategorySlug: child.slug,
            };
          }
        }
      }
    }
  }
  return null;
};

// Helper function to get all products for a main category
export const getAllProductsForCategory = (categorySlug) => {
  const category = categoryData[categorySlug];
  if (!category) return [];

  const allProducts = [];
  category.subCategories.forEach((subCat) => {
    subCat.children.forEach((child) => {
      if (child.products) {
        child.products.forEach((product) => {
          allProducts.push({
            ...product,
            subCategory: child.name,
            mainCategory: category.title,
          });
        });
      }
    });
  });

  return allProducts;
};


// Add this after your existing categoryData object

export const occasionCategoryData = {
  wedding: {
    title: "Wedding Collection",
    description: "Explore luxurious sarees specially curated for weddings and grand celebrations.",
    subCategories: [
      {
        name: "Banarasi Sarees",
        children: [
          {
            name: "Banarasi Silk Wedding Sarees",
            slug: "banarasi-silk-wedding",
            products: [
              {
                id: "wed-bs-001",
                name: "Red Banarasi Silk Wedding Saree",
                images: [images.kabra2, images.kabra7, images.kabra11],
                price: "₹45,999",
                features: ["Pure Silk", "Zari Work", "Wedding Collection", "Red"]
              },
              {
                id: "wed-bs-002",
                name: "Maroon Banarasi Silk Saree",
                images: [images.kabra16, images.kabra21],
                price: "₹42,999",
                features: ["Pure Silk", "Gold Zari", "Heavy Border"]
              },
            ],
          },
          {
            name: "Banarasi Kadhwa Wedding",
            slug: "banarasi-kadhwa-wedding",
            products: [
              {
                id: "wed-bk-001",
                name: "Traditional Banarasi Kadhwa",
                images: [images.kabra21, images.kabra11],
                price: "₹48,999",
                features: ["Kadhwa Weave", "Pure Silk", "Wedding Special"]
              },
            ],
          },
        ],
      },
    ],
  },
  festival: {
    title: "Festival Collection",
    description: "Celebrate every festival with vibrant colors and elegant traditional sarees.",
    
    subCategories: [
      {
        name: "Festival Wear",
        children: [
          {
            name: "Organza Festival Sarees",
            slug: "organza-festival",
            products: [
              {
                id: "fest-org-001",
                name: "Green Organza Festival Saree",
                images: [images.kabra11, images.kabra17],
                price: "₹18,999",
                features: ["Organza", "Festival Wear", "Lightweight"]
              },
            ],
          },
        ],
      },
    ],
  },
  babyshower: {
    title: "Baby Shower Collection",
    description: "Celebrate the joy of motherhood with elegant and comfortable sarees.",
    
    subCategories: [
      {
        name: "Baby Shower Wear",
        children: [
          {
            name: "Pastel Baby Shower Sarees",
            slug: "pastel-baby-shower",
            products: [
              {
                id: "baby-001",
                name: "Pink Pastel Baby Shower Saree",
                images: [images.kabra11, images.kabra21],
                price: "₹15,999",
                features: ["Pastel", "Comfortable", "Lightweight"]
              },
            ],
          },
        ],
      },
    ],
  },
  engagement: {
    title: "Engagement Collection",
    description: "Shine bright on your special day with our exquisite engagement sarees.",
    
    subCategories: [
      {
        name: "Engagement Wear",
        children: [
          {
            name: "Designer Engagement Sarees",
            slug: "designer-engagement",
            products: [
              {
                id: "eng-001",
                name: "Peach Designer Engagement Saree",
                images: [images.kabra21, images.kabra14],
                price: "₹28,999",
                features: ["Designer", "Engagement", "Embroidered"]
              },
            ],
          },
        ],
      },
    ],
  },
  haldi: {
    title: "Haldi Collection",
    description: "Bright and cheerful sarees perfect for your Haldi ceremony.",
    
    subCategories: [
      {
        name: "Haldi Wear",
        children: [
          {
            name: "Yellow Haldi Sarees",
            slug: "yellow-haldi",
            products: [
              {
                id: "haldi-001",
                name: "Yellow Organza Haldi Saree",
                images: [images.kabra11, images.kabra1],
                price: "₹12,999",
                features: ["Yellow", "Organza", "Haldi Special"]
              },
              {
                id: "haldi-002",
                name: "Lemon Yellow Printed Saree",
                images: [images.kabra13, images.kabra15],
                price: "₹11,999",
                features: ["Printed", "Lightweight", "Festive"]
              },
              {
                id: "haldi-003",
                name: "Mustard Yellow Silk Saree",
                images: [images.kabra29],
                price: "₹14,999",
                features: ["Silk", "Traditional", "Haldi Ceremony"]
              },
            ],
          },
          {
            name: "Printed Haldi Sarees",
            slug: "printed-haldi",
            products: [
              {
                id: "haldi-004",
                name: "Floral Printed Haldi Saree",
                images: [images.kabra15, images.kabra29],
                price: "₹10,999",
                features: ["Floral Print", "Cotton Silk", "Bright"]
              },
            ],
          },
        ],
      },
    ],
  },
  mehendi: {
    title: "Mehendi Collection",
    description: "Vibrant and colorful sarees for your Mehendi celebration.",
    
    subCategories: [
      {
        name: "Mehendi Wear",
        children: [
          {
            name: "Green Mehendi Sarees",
            slug: "green-mehendi",
            products: [
              {
                id: "meh-001",
                name: "Green Organza Mehendi Saree",
                images: [images.kabra11, images.kabra29],
                price: "₹16,999",
                features: ["Green", "Organza", "Mehendi Special"]
              },
              {
                id: "meh-002",
                name: "Peacock Green Silk Saree",
                images: [images.kabra21, images.kabra12],
                price: "₹19,999",
                features: ["Silk", "Peacock Theme", "Embroidered"]
              },
            ],
          },
        ],
      },
    ],
  },
  pooja: {
    title: "Pooja & Rituals",
    description: "Traditional and auspicious sarees for religious ceremonies.",
    
    subCategories: [
      {
        name: "Pooja Wear",
        children: [
          {
            name: "Traditional Pooja Sarees",
            slug: "traditional-pooja",
            products: [
              {
                id: "pooja-001",
                name: "Red Pooja Cotton Saree",
                images: [images.kabra11, images.kabra29],
                price: "₹8,999",
                features: ["Cotton", "Red", "Traditional", "Pooja"]
              },
            ],
          },
        ],
      },
    ],
  },
};

// Helper function to get occasion data by slug
export const getOccasionDataBySlug = (slug) => {
  return occasionCategoryData[slug] || null;
};

// Helper function to get occasion subcategory by slug
export const getOccasionSubCategoryBySlug = (slug) => {
  for (const occasion in occasionCategoryData) {
    const occasionItem = occasionCategoryData[occasion];
    for (const subCategory of occasionItem.subCategories) {
      for (const child of subCategory.children) {
        if (child.slug === slug) {
          return {
            ...child,
            occasionTitle: occasionItem.title,
            occasionSlug: occasion,
            subCategoryName: subCategory.name,
          };
        }
      }
    }
  }
  return null;
};