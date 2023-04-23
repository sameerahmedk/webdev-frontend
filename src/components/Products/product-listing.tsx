import React from 'react';

function ProductList() {

    const products = [
        { name: 'Fancy Product', imageSrc: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', price: '$40.00 - $80.00' },
        { name: 'Special Item', imageSrc: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', price: '$18.00', sale: true, rating: 5 },
        { name: 'Sale Item', imageSrc: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', price: '$25.00', sale: true },
        { name: 'Popular Item', imageSrc: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', price: '$40.00', rating: 5 },
        { name: 'New Item', imageSrc: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg', price: '$50.00' },
      ];

  return (
    <div className="product-listing-container">
      {/* Paste your HTML code here */}
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead mb-0">With this shop homepage template</p>
          </div>
        </div>
      </header>

       {/* Navigation */}
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {/* Add your product listing HTML code here */}
        </div>
      </div>

      <footer className="py-5 bg-dark">
        <div className="container px-4 px-lg-5">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-3 text-center mb-4 mb-lg-0">
              <a className="text-white" href="#!">About</a>
            </div>
            <div className="col-lg-3 text-center mb-4 mb-lg-0">
              <a className="text-white" href="#!">Contact</a>
            </div>
          </div>
        </div>
      </footer>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="#!">Start Bootstrap</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#!">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">About</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Shop
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#!">All Products</a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">Popular Items</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">New Arrivals</a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <button className="btn btn-outline-dark" type="submit">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0">With this shop homepage template</p>
          </div>
        </div>
      </header>
      <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
    <div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      </div>
    </div>
  );
}

function ProductCard(props: { name: any; imageSrc: any; price: any; sale: any; rating: any; }) {
    const { name, imageSrc, price, sale, rating } = props;
  
    return (
      <div className="col mb-5">
        <div className="card h-100">
          {sale && <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>}
          <img className="card-img-top" src={imageSrc} alt="..." />
          <div className="card-body p-4">
            <div className="text-center">
              <h5 className="fw-bolder">{name}</h5>
              {rating && (
                <div className="d-flex justify-content-center small text-warning mb-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`bi-star-fill${i < rating ? ' text-primary' : ' text-muted'}`}></div>
                  ))}
                </div>
              )}
              <div>{price}</div>
            </div>
          </div>
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">{sale ? 'Add to cart' : 'View options'}</a></div>
          </div>
        </div>
      </div>
    );
  }

export default ProductList;
