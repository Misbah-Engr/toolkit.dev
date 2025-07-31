{
  description = "Toolkit.dev - The chatbot that pays every merged PR";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    node2nix = {
      url = "github:svanderburg/node2nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, flake-utils, node2nix }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        
        # Node.js version
        nodejs = pkgs.nodejs_20;
        
        # pnpm
        pnpm = pkgs.nodePackages.pnpm;
        
        # Create a custom shell with all the tools we need
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Node.js and pnpm
            nodejs
            pnpm
            
            # Prisma engines
            prisma-engines
            
            # Database
            postgresql_16
            
            # Docker (for database setup)
            docker
            
            # Development tools
            git
            curl
            jq
            
            # Optional: Add more tools as needed
            # tree
            # htop
            # ripgrep
          ];
          
          # Set environment variables to fix Prisma issues
          shellHook = with pkgs; ''
            echo "🚀 Toolkit.dev development environment loaded!"
            echo "Available commands:"
            echo "  pnpm install    - Install dependencies"
            echo "  pnpm dev        - Start development server"
            echo "  pnpm build      - Build the application"
            echo "  pnpm db:generate - Generate database migrations"
            echo "  ./start-database.sh - Start PostgreSQL with Docker"
            echo ""
            echo "Node.js version: $(node --version)"
            echo "pnpm version: $(pnpm --version)"
            echo "PostgreSQL version: $(psql --version)"
            
            # Set Prisma engine paths to use nixpkgs binaries
            export PRISMA_SCHEMA_ENGINE_BINARY="${prisma-engines}/bin/schema-engine"
            export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
            export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
            export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
          '';
          
          # Set environment variables
          NIX_SHELL_PRESERVE_PROMPT = 1;
        };
        
        # Build the application
        buildApp = pkgs.writeShellScriptBin "build-toolkit" ''
          set -e
          echo "🔨 Building Toolkit.dev..."
          
          # Set Prisma engine paths to use nixpkgs binaries
          export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
          export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
          export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
          export PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt"
          
          # Install dependencies
          pnpm install
          
          # Generate Prisma client
          pnpm prisma generate
          
          # Build the application
          pnpm build
          
          echo "✅ Build completed successfully!"
        '';
        
        # Development server
        devServer = pkgs.writeShellScriptBin "dev-toolkit" ''
          set -e
          echo "🚀 Starting Toolkit.dev development server..."
          
          # Set Prisma engine paths to use nixpkgs binaries
          export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
          export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
          export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
          export PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt"
          
          # Install dependencies if not already installed
          if [ ! -d "node_modules" ]; then
            echo "Installing dependencies..."
            pnpm install
          fi
          
          # Generate Prisma client
          pnpm prisma generate
          
          # Start development server
          pnpm dev
        '';
        
        # Database setup
        setupDb = pkgs.writeShellScriptBin "setup-db" ''
          set -e
          echo "🗄️  Setting up database..."
          
          # Set Prisma engine paths to use nixpkgs binaries
          export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
          export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
          export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
          export PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt"
          
          # Start database if not running
          if ! docker ps | grep -q toolkit-postgres; then
            echo "Starting PostgreSQL container..."
            ./start-database.sh
          fi
          
          # Generate and run migrations
          echo "Running database migrations..."
          pnpm db:generate
          
          echo "✅ Database setup completed!"
        '';
        
      in {
        # Development shell
        devShells.default = devShell;
        
        # Packages
        packages = {
          # Default package (builds the app)
          default = pkgs.stdenv.mkDerivation {
            pname = "toolkit-dev";
            version = "0.1.0";
            
            src = ./.;
            
            nativeBuildInputs = with pkgs; [
              nodejs
              pnpm
            ];
            
            buildPhase = ''
              # Set Prisma engine paths to use nixpkgs binaries
              export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
              export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
              export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
              export PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt"
              
              # Install dependencies
              pnpm install --frozen-lockfile
              
              # Generate Prisma client
              pnpm prisma generate
              
              # Build the application
              pnpm build
            '';
            
            installPhase = ''
              # Copy the built application
              mkdir -p $out
              cp -r .next $out/
              cp -r public $out/
              cp -r prisma $out/
              cp package.json $out/
              cp next.config.js $out/
              
              # Create a start script
              cat > $out/start.sh << 'EOF'
              #!/bin/sh
              cd $out
              pnpm start
              EOF
              chmod +x $out/start.sh
            '';
            
            meta = with pkgs.lib; {
              description = "Toolkit.dev - The chatbot that pays every merged PR";
              homepage = "https://toolkit.dev";
              license = licenses.mit;
              platforms = platforms.unix;
            };
          };
          
          # Build script
          build = buildApp;
          
          # Development server script
          dev = devServer;
          
          # Database setup script
          setup-db = setupDb;
        };
        
        # Apps
        apps = {
          # Default app (runs the development server)
          default = {
            type = "app";
            program = "${devServer}/bin/dev-toolkit";
          };
          
          # Build app
          build = {
            type = "app";
            program = "${buildApp}/bin/build-toolkit";
          };
          
          # Database setup
          setup-db = {
            type = "app";
            program = "${setupDb}/bin/setup-db";
          };
        };
        
        # Checks
        checks = {
          # Type checking
          typecheck = pkgs.stdenv.mkDerivation {
            pname = "toolkit-typecheck";
            version = "0.1.0";
            
            src = ./.;
            
            nativeBuildInputs = with pkgs; [
              nodejs
              pnpm
            ];
            
            buildPhase = ''
              # Set Prisma engine paths to use nixpkgs binaries
              export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
              export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
              export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
              export PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt"
              
              # Install dependencies
              pnpm install --frozen-lockfile
              
              # Run type checking
              pnpm typecheck
            '';
            
            installPhase = "mkdir -p $out";
            
            meta = with pkgs.lib; {
              description = "Type checking for Toolkit.dev";
            };
          };
          
          # Linting
          lint = pkgs.stdenv.mkDerivation {
            pname = "toolkit-lint";
            version = "0.1.0";
            
            src = ./.;
            
            nativeBuildInputs = with pkgs; [
              nodejs
              pnpm
            ];
            
            buildPhase = ''
              # Set Prisma engine paths to use nixpkgs binaries
              export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
              export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
              export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
              export PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt"
              
              # Install dependencies
              pnpm install --frozen-lockfile
              
              # Run linting
              pnpm lint
            '';
            
            installPhase = "mkdir -p $out";
            
            meta = with pkgs.lib; {
              description = "Linting for Toolkit.dev";
            };
          };
        };
      }
    );
} 