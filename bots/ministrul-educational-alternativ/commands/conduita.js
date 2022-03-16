const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('conduita')
		.setDescription('Conduita')
		.addSubcommand(subcommand =>
			subcommand
				.setName('scurta')
				.setDescription('Varianta scurta a conduitei #esteREAL.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('detaliata')
				.setDescription('Varianta detaliata a conduitei #esteREAL')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'scurta')
			await interaction.reply("1. **Transparență**\n2. **Dialog**\n3. **Take it outside**\n4. **Every opinion counts**\n5. **Echilibru**\n6. **Obiectiv**\n7. **Respect**");
		if (interaction.options.getSubcommand() === 'detaliata')
			await interaction.reply("Conform codului de conduită:\n\n1. **Transparență** Discuțiile legate de proiect trebuie purtate pe cât posibil pe canale publice, pentru a le permite tuturor colegilor să fie la curent cu ultimele noutăți.\n\n2. **Dialog** Discuțiile legate de proiect trebuie să fie amiabile și civilizate, pentru a ne permite să ne concentrăm pe ce este cu adevărat important. Critica este foarte utilă, dar doar în formă constructivă.\n\n3. **Take it outside** În cazul în care critica devine neconstructivă dintr-un motiv sau altul, persoanele implicate trebuie să se retragă într-un spațiu privat pentru a continua discuția, pentru a nu cultiva o atmosferă toxică.\n\n4. **Every opinion counts** Proiectul nostru se bazează pe tratarea opiniilor ca egale. Trebuie aplicat principiul ăsta și intern. Sunt încurajate discuțiile deschise și poll-urile, pentru a include cât mai multe perspective.\n\n5. **Echilibru** Chiar dacă lucram la un proiect foarte mișto, trebuie să avem grijă și de noi și să păstrăm un echilibru de timp și energie între viața personală și proiect. Astă ajută pe termen lung și proiectul, prin evitarea burnout-ului.\n\n6. **Obiectiv** Trebuie să nu ne lăsăm copleșiți de satisfacții personale derivate din implicarea în proiect și să prioritizăm calitatea proiectului.\n\n7. **Respect** Munca fiecăruia trebuie respectată și apreciată, însă calitatea rămâne prioritară pentru produsul final, în acord cu punctul 6.")
	}
};