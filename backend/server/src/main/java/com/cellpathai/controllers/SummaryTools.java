import dev.langchain4j.agent.tool.Tool;
import dev.langchain4j.model.chat.ChatLanguageModel;

/**
 * AI tool that summarizes biology topics
 */
public class SummaryTools implements AgentTool {
    /** GenAI model used to generate summaries given prompts **/
    private final ChatLanguageModel model;

    /**
     * Gives a summary and reading materials for a biology topic
     *
     * @param topic biology topic to summarize
     * @return summary of topic
     */
    @Tool("Summarize topics in an educational manner")
    public String summarizeTopic(String topic) {
        if (topic == null || topic.isEmpty()) {
            return "Please provide a topic";
        }

        String prompt = "Given a specific biology topic, provide reading materials and summaries on that topic";

        try {
            String summary = model.generate(prompt);
            return (summary == null || summary.isEmpty()) ? "There is no topic to summarize" : summary;
        }  catch (Exception e) {
            return "There was an error when generating a summary";
        }
    }

    @Override
    public String getName() {
        return "Summary Tools";
    }

    @Override
    public String getDescription() {
        return "Summarizes a biology topic";
    }

    /**
     * Constructor for AI tool
     *
     * @param model GenAI model
     */
    public SummaryTools(ChatLanguageModel model) {
        this.model = model;
    }
}