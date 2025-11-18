echo "Generating RSA key pair for JWT..."

openssl genrsa -out jwt-private.pem 2048

openssl rsa -in jwt-private.pem -pubout -out jwt-public.pem

echo "Keys generated successfully!"
echo ""
echo "Private key: jwt-private.pem"
echo "Public key: jwt-public.pem"
echo ""
echo "Add these keys to your .env file:"
echo "JWT_PRIVATE_KEY=\"\$(cat jwt-private.pem)\""
echo "JWT_PUBLIC_KEY=\"\$(cat jwt-public.pem)\""

