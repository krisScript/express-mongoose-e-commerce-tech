console.log('ksame wa')
const removeProductFromCart = () => {
    
    const removeBtnList = document.querySelectorAll('.remove-btn');
    if (removeBtnList.length > 0) {
        const csrf = document.querySelector("[name='_csrf']").value;
      removeBtnList.forEach(removeBTn => {
        removeBTn.addEventListener('click', e => {
            e.preventDefault()
           
          const productId = e.target.getAttribute('data-productId');
          fetch(`/cart/remove-product/${productId}`, {
            method: 'DELETE',
            headers: {
              'csrf-token': csrf
            }
          })
            .then(response => {
              return response.json();
            })
            .then(response => {

                if (response.msg === 'product removed') {
                    const selectedProduct = document.querySelector(`#cart-product-${productId}`);
                    const productsCount = document.querySelector('.products-count')
                    const priceElement = document.querySelector('#price')
                    const taxElement = document.querySelector('#tax')
                    const totalPriceElement = document.querySelector('#total-price')
                    
                    if(response.productsInCart > 0){
                        productsCount.textContent = `${response.productsInCart} items in the cart`
                    }else {
                        productsCount.remove()
                    }
                    priceElement.textContent = response.price
                    taxElement.textContent = response.tax
                    totalPriceElement.textContent = response.totalPrice
                    selectedProduct.remove();
                  }
             
            });
        });
      });
    }
  };

  removeProductFromCart()