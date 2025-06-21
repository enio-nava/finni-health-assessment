.PHONY: install start-server start-client start dev clean

# Install dependencies
install:
	@echo "Installing server dependencies..."
	cd server && npm install
	@echo "Installing client dependencies..."
	cd client && npm install

# Start the server
start-server:
	@echo "Starting server..."
	cd server && npm run dev

# Start the client
start-client:
	@echo "Starting client..."
	cd client && npm start

# Start both client and server in development mode
dev:
	@echo "Starting development environment..."
	$(MAKE) start-server & $(MAKE) start-client

# Build the client for production
build:
	@echo "Building client for production..."
	cd client && npm run build

# Start the application in production mode
start:
	@echo "Starting application in production mode..."
	cd server && npm start

# Clean the project (remove node_modules and build directories)
clean:
	@echo "Cleaning project..."
	rm -rf server/node_modules client/node_modules client/build

# Setup the project (install dependencies and create necessary directories)
setup: install
	@echo "Project setup complete!"
	@echo "Run 'make dev' to start the development environment"
