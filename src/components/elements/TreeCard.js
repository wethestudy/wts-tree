function TreeCard() {
    return <div className="sidebar-card" id="sidebar-card">
      <div className="card-scroll">
          <div className="sidebar-buttons">
            <div className="reveal-button">
              <div className="mobile-reveal-container">
                <div className="mobile-reveal-wrapper" id="reveal-button"></div>
              </div>
            </div>
            <div className="hide-button">
              <div className="mobile-hide-container">
                <div className="mobile-hide-wrapper" id="hide-button"></div>
              </div>
            </div>
            <a href="" className="card-button" id="mobile-card-button">EXPLORE</a>
          </div>
          <div className="card-title" id="card-title">Select a Tree Node</div>
          <div className="card-seo">
            <div className="card-border"></div>
            <div className="card-block" id="card-block"></div>
          </div>
          <div className="card-wrapper">
            <div className="card-label">Category</div>
            <div className="card-field" id="card-category"></div>
          </div>
          <div className="card-wrapper">
            <div className="card-label">Subcategory</div>
            <div className="card-field" id="card-subcategory"></div>
          </div>
          <div className="card-wrapper">
            <div className="card-label">Topic</div>
            <div className="card-field" id="card-topic"></div>
          </div>
          <div className="card-wrapper">
            <div className="card-label">Revision</div>
            <div className="card-field" id="card-revision"></div>
          </div>
          <div className="card-wrapper">
            <div className="card-label">Sibling Order</div>
            <div className="card-field" id="card-order"></div>
          </div>
          <a href="" className="card-button" id="card-button">EXPLORE</a>
        </div>
      </div>;
  }

export default TreeCard