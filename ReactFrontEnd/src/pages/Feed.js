import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Button,
  CardContent,
  CardActions,
  Chip,
  Stack,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Feed = () => {
  const [query, setQuery] = useState("");
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`http://localhost:8080/posts/${query}`);
      setPost(response.data);
    };
    const fetchInitialPosts = async () => {
      const response = await axios.get(`http://localhost:8080/allPosts`);
      console.log(response);
      setPost(response.data);
    };
    if (query.length === 0) fetchInitialPosts();
    if (query.length > 2) fetchPosts();
  }, [query]);
  console.log(post);

  return (
    <Box sx={{ padding: "2%", background: "#f4f4f4", minHeight: "100vh" }}>
      <Grid container spacing={2}>
        {/* Header Section */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
              Job Feed
            </Typography>
            <Button variant="outlined" sx={{ textTransform: "none" }}>
              <Link to="/" style={{ textDecoration: "none", color: "#0074d9" }}>
                Home
              </Link>
            </Button>
          </Box>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search for job profiles..."
            sx={{
              width: "100%",
              background: "#fff",
              borderRadius: 1,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>

        {/* Job Cards */}
        {post &&
          post.map((p) => (
            <Grid key={p.id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  padding: 2,
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                  backgroundColor: "#fff",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "600", color: "#333", mb: 1 }}
                  >
                    {p.profile}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#555", mb: 2, lineHeight: 1.6 }}
                  >
                    {p.desc}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", fontWeight: "bold", mb: 1 }}
                  >
                    Years of Experience: {p.exp} years
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>
                    Skills:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {p.techs.map((s, i) => (
                      <Chip
                        key={i}
                        label={s}
                        sx={{
                          backgroundColor: "#0074d9",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#0074d9",
                      "&:hover": {
                        backgroundColor: "#005bb5",
                      },
                    }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Feed;
