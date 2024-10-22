import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { keyframes, styled } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const fadeInLeft = keyframes`
  0% { opacity: 0; transform: translateX(-100%); }
  100% { opacity: 1; transform: translateX(0); }
`;

const fadeInRight = keyframes`
  0% { opacity: 0; transform: translateX(100%); }
  100% { opacity: 1; transform: translateX(0); }
`;

const ChatContainer = styled(Paper)(() => ({
  maxWidth: "2000px",
  margin: "50px 30px 0 280px",
  padding: "40px",
  borderRadius: "12px",
  backgroundColor: "rgba(255, 255, 255, 0.85)", // Slight transparency for modern look
  boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)", // Strong shadow for depth
  backdropFilter: "blur(10px)", // Blur effect for background
}));

const ChatHistory = styled(Box)(() => ({
  maxWidth: "2000px",
  marginBottom: "20px",
  borderRadius: "12px",
  maxHeight: "400px",
  overflowY: "auto",
  border: "1px solid #e1e1e1",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#ff9800", // Orange scrollbar for theme
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
  },
}));

const Message = styled(Box)(({ role }) => ({
  margin: "10px",
  padding: "12px",
  borderRadius: "16px",
  backgroundColor: role === "user" ? "#fff3e0" : "#ffffff", // Light orange for user, white for bot
  textAlign: role === "user" ? "right" : "left",
  border: role === "user" ? "2px solid #ff9800" : "none",
  animation:
    role === "user" ? `${fadeInRight} 0.5s ease` : `${fadeInLeft} 0.5s ease`,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  transition: "all 0.3s ease",
}));

const StyledButton = styled(Button)(() => ({
  padding: "10px 24px",
  borderRadius: "30px",
  backgroundColor: "#ff9800", // Orange background for theme
  color: "#fff",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#e68900", // Darker orange on hover
  },
  boxShadow: "0px 4px 15px rgba(255, 152, 0, 0.4)", // Hover shadow
  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
}));

const Chatbot = () => {
  const [state, setState] = useState("start");
  const [userInput, setUserInput] = useState("");
  const [summary, setSummary] = useState("");
  const [userChoices, setUserChoices] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [suggestedTitles, setSuggestedTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const navigate = useNavigate();

  const decisionTree = {
    start: {
      question: "Please select a option:",
      options: [
        { text: "Basic page", next: "not_in_service" },
        { text: "Blog", next: "blog_options" },
        { text: "Case Study", next: "case_study" },
        { text: "Clients", next: "not_in_service" },
        { text: "Ebook", next: "not_in_service" },
        { text: "Jobs", next: "not_in_service" },
        { text: "Landing Page", next: "not_in_service" },
        { text: "Partners", next: "not_in_service" },
        { text: "Press Release", next: "not_in_service" },
        { text: "Newsletter Issue", next: "not_in_service" },
        { text: "Testimonials", next: "not_in_service" },
        { text: "Visiting Page", next: "not_in_service" },
        { text: "Visiting Page Banner", next: "not_in_service" },
        { text: "Webinars", next: "not_in_service" },
        { text: "Whitepaper", next: "not_in_service" },
      ],
    },
    case_study: {
      question: "Redirecting to the Case Study Editor...",
      options: [],
    },
    blog_options: {
      question: "Please select a blog field:",
      options: [
        { text: "Drupal-CMS", next: "drupal_fields" },
        { text: "WordPress-CMS", next: "wordpress_fields" },
        { text: "Moodle", next: "moodle_fields" },
        { text: "AWS/Cloud", next: "aws_fields" },
        { text: "Others", next: "other_fields" },
        { text: "No Idea", next: "end" },
      ],
    },
    drupal_fields: {
      question: "Please select a Drupal-CMS field:",
      options: [
        { text: "Drupal 8 Best Practices", next: "tech_nontech" },
        { text: "Drupal Module Development", next: "tech_nontech" },
        { text: "Drupal Security Tips", next: "tech_nontech" },
        { text: "Drupal Performance Optimization", next: "tech_nontech" },
        { text: "Drupal Theme Customization", next: "tech_nontech" },
      ],
    },
    wordpress_fields: {
      question: "Please select a WordPress-CMS field:",
      options: [
        { text: "WordPress Security Tips", next: "tech_nontech" },
        { text: "WP Plugin Management", next: "tech_nontech" },
        { text: "WordPress Speed Optimization", next: "tech_nontech" },
        { text: "WP Theme Customization", next: "tech_nontech" },
        { text: "WordPress SEO Strategies", next: "tech_nontech" },
      ],
    },
    moodle_fields: {
      question: "Please select a Moodle field:",
      options: [
        { text: "Moodle LMS Integration", next: "tech_nontech" },
        { text: "E-Learning Platform", next: "tech_nontech" },
        { text: "Moodle Customization", next: "tech_nontech" },
        { text: "Online Course Creation", next: "tech_nontech" },
        { text: "Moodle Security", next: "tech_nontech" },
      ],
    },
    aws_fields: {
      question: "Please select an AWS/Cloud field:",
      options: [
        { text: "AWS Cloud Security", next: "tech_nontech" },
        { text: "Cloud Migration Strategies", next: "tech_nontech" },
        { text: "Serverless Architecture", next: "tech_nontech" },
        { text: "Cloud Cost Optimization", next: "tech_nontech" },
        { text: "AWS Compliance Guide", next: "tech_nontech" },
      ],
    },
    other_fields: {
      question: "Please select a field :",
      options: [
        { text: "Digital Transformation Strategies", next: "tech_nontech" },
        { text: "Cybersecurity Best Practices", next: "tech_nontech" },
        { text: "Artificial Intelligence Adoption", next: "tech_nontech" },
        { text: "Data Analytics Solutions", next: "tech_nontech" },
        { text: "Customer Experience Improvement", next: "tech_nontech" },
      ],
    },
    tech_nontech: {
      question: "Please select a type:",
      options: [
        { text: "Technical", next: "role_selection" },
        { text: "Non-technical", next: "role_selection" },
      ],
    },
    role_selection: {
      question: "Great! Who would be the intended audience?",
      options: [
        { text: "CTO", next: "final_step", type: "checkbox" },
        { text: "CMO", next: "final_step", type: "checkbox" },
        { text: "VP-IT", next: "final_step", type: "checkbox" },
        { text: "CEO", next: "final_step", type: "checkbox" },
        { text: "SVP/VP-IT", next: "final_step", type: "checkbox" },
        { text: "Director Web", next: "final_step", type: "checkbox" },
        { text: "Director Marketing", next: "final_step", type: "checkbox" },
      ],
    },
    final_step: {
      question: "You’ve wrapped up your selection.",
      options: [],
    },
    not_in_service: {
      question:
        "Apologies, this service is currently unavailable. Please choose a different option.",
      options: [{ text: "Go back to start", next: "start" }],
    },
    end: {
      question: "You’ve wrapped up your selection.",
      options: [],
    },
  };

  useEffect(() => {
    if (currentMessage) {
      const timer = setTimeout(() => {
        setHistory((prevHistory) => [
          ...prevHistory,
          { role: "bot", text: currentMessage },
        ]);
        setCurrentMessage("");
      }, 500); // Simulate a delay for bot's response

      return () => clearTimeout(timer);
    }
  }, [currentMessage]);

  const handleOptionClick = async (nextState, optionText) => {
    // Add user choice to history
    setHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", text: optionText },
    ]);
    setUserChoices((prevChoices) => [...prevChoices, optionText]);

    if (nextState === "case_study") {
      navigate("/post-editor", {
        state: {
          contentData: {
            title: "Case Study", // Pre-fill with a default title for case study
            body: "", // Leave empty to fill in the editor
            tag: "Case Study", // Pre-fill with a default tag
          },
        },
      });
    } else if (nextState === "not_in_service") {
      // Show "service not available" message and immediately show root options again
      setHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "bot",
          text: "Apologies, this service is currently unavailable.",
        },
      ]);
      setState("start"); // Automatically go back to the root state
      setCurrentMessage(decisionTree["start"].question); // Show the root question again
    } else if (nextState === "final_step") {
      // Automatically trigger title generation after completing selections
      try {
        const response = await axios.post(
          OPENAI_API_URL,
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a skilled technical writer. Based on the following topics selected by the user, suggest some compelling titles for an article.",
              },
              {
                role: "user",
                content: `Suggest 5 crisp, eye-catching titles based on the following topics but don't add numbering, hyphen, or quotes: ${userChoices.join(
                  ", "
                )}.`,
              },
            ],
            temperature: 0.7,
            max_tokens: 500,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );

        const suggestedTitles = response.data.choices[0].message.content
          .split("\n")
          .filter((title) => title.trim());
        setSuggestedTitles(suggestedTitles);
        setCurrentMessage(""); // Clear any previous messages
      } catch (error) {
        console.error("Error while sending message to OpenAI:", error);
        setSummary("There was an error generating the titles.");
      }
    } else {
      setState(nextState);
      setCurrentMessage(decisionTree[nextState].question);
    }
  };
  const handleUserInputSubmit = async (e) => {
    e.preventDefault();

    if (!userInput) return;

    // setSummary("Generating titles...");

    try {
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a skilled technical writer. Based on the user's provided topic, suggest some compelling titles for an article.",
            },
            {
              role: "user",
              content: `Suggest 5 crisp, eye-catching titles based on the following topics but don't add numbering, hyphen, or quotes: ${userInput}.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const suggestedTitles = response.data.choices[0].message.content
        .split("\n")
        .filter((title) => title.trim());
      setSuggestedTitles(suggestedTitles);
      setCurrentMessage(""); // Clear any previous messages
    } catch (error) {
      console.error("Error while sending message to OpenAI:", error);
      setSummary("There was an error generating the titles.");
    }
  };

  const handleTitleSelect = async (title) => {
    setSelectedTitle(title);
    setSummary("Generating content...");
  
    try {
      const contentResponse = await axios.post(
        OPENAI_API_URL,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a skilled technical writer. Create a detailed article in about 250 words based on the user's selected title.",
            },
            {
              role: "user",
              content: `Generate a detailed article in around 250 words based on the following title: ${title}.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
  
      const generatedContent = contentResponse.data.choices[0].message.content;
      setSummary(generatedContent);
      
      // Generate a one-word tag based on the content
      const tagResponse = await axios.post(
        OPENAI_API_URL,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a skilled technical writer. Generate a one-word tag that summarizes the following content.",
            },
            {
              role: "user",
              content: `Provide a single-word tag for this content: ${generatedContent}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 10,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
  
      const generatedTag = tagResponse.data.choices[0].message.content.trim();
      
      // Add bot response to history
      setHistory((prevHistory) => [
        ...prevHistory,
        { role: "bot", text: generatedContent },
      ]);
      console.log(title);
      console.log(generatedContent);
      console.log(generatedTag);
      // Print title and body to console
      // Automatically save and redirect to the Post Editor page with title, content, and tag
      handleSave(title, generatedContent, generatedTag);
    } catch (error) {
      console.error("Error while sending message to OpenAI:", error);
      setSummary("There was an error generating the article.");
    }
  };
  const handleSave = (title, content, generatedTag) => {
    navigate("/post-editor", {
      state: {
        contentData: {
          title: title, // Pass the selected title
          body: content, // Pass the generated content
          tag: generatedTag, // Pass the generated tag
        },
      },
    });
  };

  const currentStep = decisionTree[state];

  return (
    <ChatContainer>
      <Typography variant="h6" gutterBottom>
        AI Content Writer
      </Typography>
      <ChatHistory>
        {history.map((message, index) => (
          <Message key={index} role={message.role}>
            {message.text}
          </Message>
        ))}
      </ChatHistory>
      {suggestedTitles.length > 0 ? (
        <Box>
          <Typography variant="h6">Suggested Titles:</Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            {suggestedTitles.map((title, index) => (
              <StyledButton
                key={index}
                onClick={() => handleTitleSelect(title)}
                variant="contained"
                style={{ margin: "5px", flex: "1 1 auto" }} // Adjust margin and flex for spacing
              >
                {title}
              </StyledButton>
            ))}
          </Box>
        </Box>
      ) : currentStep.options.length > 0 ? (
        <Box>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            {currentStep.options.map((option, index) => (
              <StyledButton
                key={index}
                onClick={() => handleOptionClick(option.next, option.text)}
                variant="contained"
                style={{ margin: "5px", flex: "1 1 auto" }}
              >
                {option.text}
              </StyledButton>
            ))}
          </Box>
        </Box>
      ) : (
        <form onSubmit={handleUserInputSubmit}>
          <TextField
            label="Enter your topic"
            variant="outlined"
            fullWidth
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <StyledButton type="submit" variant="contained" fullWidth>
            Submit
          </StyledButton>
        </form>
      )}
      <Divider style={{ margin: "20px 0" }} />
      <Typography variant="body1">{summary}</Typography>
    </ChatContainer>
  );
};

export default Chatbot;
