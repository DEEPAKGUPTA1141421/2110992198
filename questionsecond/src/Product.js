const ProductDetailsPage = () => {
    const [product, setProduct] = useState(null);
  
    useEffect(() => {
      const fetchProductDetails = async () => {
        try {
          const productId = "testProduct";
          const response = await axios.get(`${API_BASE_URL}/categories/all/products/${productId}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };
  
      fetchProductDetails();
    }, []);
  
    if (!product) {
      return <div>Loading...</div>;
    }
  
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">{product.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img src={product.image} alt={product.name} style={{ maxWidth: '100%' }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Company: {product.company}</Typography>
            <Typography variant="subtitle1">Category: {product.category}</Typography>
            <Typography variant="subtitle1">Price: ${product.price}</Typography>
            <Typography variant="subtitle1">Rating: {product.rating}</Typography>
            <Typography variant="subtitle1">Discount: {product.discount}%</Typography>
            <Typography variant="subtitle1">Availability: {product.availability}</Typography>
          </Grid>
        </Grid>
      </Container>
    );
  };
  