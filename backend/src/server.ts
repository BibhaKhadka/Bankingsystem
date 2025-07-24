// ... your imports remain the same

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware (unchanged)
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (unchanged)
app.use('/api/auth', authRoutes);
// ... other routes

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://host.docker.internal:27017/ai-banking';

// Using host.docker.internal allows container to connect to host's MongoDB on Docker Desktop (Windows/Mac)
// For Linux, you'll need to pass your host IP or run MongoDB in another container with Docker networking

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Error handler (unchanged)
app.use((err: any, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server listening on 0.0.0.0, so it’s accessible outside container
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
