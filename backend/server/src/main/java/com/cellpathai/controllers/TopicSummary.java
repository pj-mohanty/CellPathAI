import dev.langchain4j.model.openai.OpenAiChatModel;

/**
 * Class to run SummaryTools
 */
public class TopicSummary {
    /**
     * Creates AI agent and run based on biology topic
     *
     * @param topic biology topic to summarize
     * @returns summary of topic
     */
    public String runSummaryAgent(String topic) {
        OpenAiChatModel model = OpenAiChatModel.builder()
                .apiKey("")
                .modelName("gpt-4o-mini")
                .temperature(0.2)
                .build();

        SummaryTools tools = new SummaryTools(model);
        return tools.summarizeTopic(topic);
    }

    /**
     * Main method to test summarizing topic
     *
     * @param args Command-line arguments
     */
    public static void main(String[] args) {
       TopicSummary summary = new TopicSummary();
       try {
           System.out.println(summary.runSummaryAgent("mitosis"));
       } catch (Exception e) {
           System.err.println("Could not start the agent");
       }
    }
}