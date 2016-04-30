/*
  Chau (Joe) Duong
  IT 328
  Products App
  This is the js file for main.html
*/

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//Creating a bunch of objects.
var products = [
    {
        productId: 0,
        productName: "Harry Potter Returns to Hogwarts",
        productDescription: "Harry Potter is just a regular boy, or is he? He is about \
                             to embark on a wonderful and magical adventure at Hogwarts \
                             School of Witchcraft and Wizardry. ",
        quantity: 13,
        image: "harrypotter.jpg",
        keywords: ["children", "books", "fantasy"],
        price: 19.99,
        salesPrice: 0.0
    }, 
    {
        productId: 1,
        productName: "Barbie Birthday Doll",
        productDescription: "The perfect gift for any girl during her birthday. Sparkling \
                             and beautiful, Barbie is now a modern girl. Arrange her hair, \
                             change her make-up or pick one of several outfits.",
        quantity: 80,
        image: "barbie.jpg",
        keywords: ["children", "dolls", "barbie"],
        price: 9.99,
        salesPrice: 6.99
    }, 
    {
        productId: 2,
        productName: "Apple iPhone x",
        productDescription: "Bigger and better, the iPhone 6 has a new zeon processor and \
                             a new 6.55 inch screen for your viewing pleasure. Apple eye-view \
                             also gives you zoom capabilities at 1000% normal.",
        quantity: 0,
        image: "iphone.jpg",
        keywords: ["phone", "Apple", "iPhone", "smart phone"],
        price: 199.99,
        salesPrice: 179.99
    },
    {
        productId: 3,
        productName: "Basketball",
        productDescription: "This regulation size basketball will satisfy any outdoor \
                             enthusiast. Durable and resistent to wear, this ball will \
                             last hours without the need to re-inflate.",
        quantity: 0,
        image: "basketball.png",
        keywords: ["basketball", "sports", "NBA"],
        price: 19.99,
        salesPrice: 14.99
    },
    {
        productId: 4,
        productName: "Vacation Poster",
        productDescription: "Have you been dreaming of that vacation you keep putting off? \
                             Hang this poster in your office and you will be there before \
                             you arrive! Made with only quality materials.",
        quantity: 0,
        image: "poster.jpg",
        keywords: ["vacation", "sunny", "beach", "poster", "colorful"],
        price: 4.99,
        salesPrice: 0
    },
];

function onSale() {
    if (salesPrice == 0) {
        return true;
    } else
      return false;
}

//Empty the sessions
Session.setDefault('productArray', []);
Session.setDefault('shoppingCart', []);
Session.setDefault('itemsOnSales', []);
//Putting stuffs into session
Session.set('productArray', products);

//Helpers for productList
Template.productList.helpers({
  productData: function() {
	return Session.get('productArray');
  },
    
  totalProducts: function() {
	return Session.get('productArray').length + ' total products.';
  },
  
  /*
  myQuantity; function() {
    for (var i = 0; i < Session.get('productArray').length; i++) {
        return Session.get('productArray')[i].quantity;
    }
  }*/
  
  //Checking stock - Not working. Always conditioned to true. Only the first element of the array went through.
  stockLevels: function() {
   for (var i = 0; i < Session.get('productArray').length; i++) {
        if (Session.get('productArray')[i].quantity > 0) {
            return ' (in-stock)';
        } else if (Session.get('productArray')[i].quantity == 0) {
            return ' (out-of-stock)';
        }    
   }
},

    salesItems: function() {
       for (var i = 0; i < Session.get('productArray').length; i++) {
            if (Session.get('productArray')[i].salesPrice != 0.0) {
                Session.set('itemsOnSales', this.products.productName)
                return true;
            } else if (Session.get('productArray')[i].salesPrice == 0) {
                return false;
            }    
       }
    }
});

Template.sales.helpers({
    //Retrieve the cart info
    itemsOnSales: function() {
	return Session.get('itemsOnSales');
  },
});


Template.productList.events({
    'click #buyBtn': function (e) {
      e.preventDefault();
      
      Session.set('shoppingCart', this);
      //product: [product object...],
     //quantity: 10
    }
});


Template.cart.helpers({
    //Retrieve the cart info
    myCart: function() {
	return Session.get('shoppingCart');
  },
});

