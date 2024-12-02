const {
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	ActionRowBuilder,
	codeBlock,
	ModalBuilder,
} = require("discord.js");
require("dotenv").config();

module.exports = {
	cooldown: 10,
	data: {
		name: "feedback",
	},
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setTitle("Feedback")
			.setCustomId("feedback-modal");

		const modalRow1 = new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId("details")
				.setLabel("Feedback Details")
				.setStyle(TextInputStyle.Paragraph)
				.setPlaceholder("Enter the feedback details")
		);

		modal.addComponents(modalRow1);

		await interaction.showModal(modal);

		const modalReply = await interaction
			.awaitModalSubmit({
				time: 60_000,
				filter: (modalInteraction) =>
					modalInteraction.user.id === interaction.user.id,
			})
			.catch();

		if (!modalReply) return;

		await modalReply.reply({
			content: codeBlock(modalReply.fields.getTextInputValue("details")),
			ephemeral: true,
		});
	},
};
