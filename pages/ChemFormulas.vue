<script setup>
const showHistory = ref(true)
</script>

<template>
	<!-- what is the smallest size that it can keep that low amount of cols -->
	<!-- <b-container
		:toast="{ root: true }"
		fluid="sm"
		position="position-fixed"
	></b-container> -->

	<!-- <Var name="a" /> -->
	<ion-page>
		<ion-content>
			<ion-grid>
				<!-- xxl="4" xl="5" lg="6" md="7" sm="8" -->
				<ion-row class="ion-justify-content-evenly">
					<QuickCalculator />

					<QuickFormula />

					<!-- <ConversionCalculator
						name="pH"
						formulas="pH == 14-pOH && pH == -Log[10,cH] && pOH == -Log[10,cOH]"
						:vars="['pH', 'pOH', 'cH', 'cOH']"
					/> -->

					<ConversionCalculator
						:vars="[
							{
								name: 'pH',
								onInput(vmodels) {
									vmodels.pOH = 14 - vmodels.pH
									vmodels.cH = 10 ** -vmodels.pH
									vmodels.cOH = 10 ** -vmodels.pOH
								}
							},
							{
								name: 'pOH',
								onInput(vmodels) {
									vmodels.pH = 14 - vmodels.pOH
									vmodels.cOH = 10 ** -vmodels.pOH
									vmodels.cH = 10 ** -vmodels.pH
								}
							},
							{
								name: 'cH',
								units: 'M',
								onInput(vmodels) {
									vmodels.pH = -Math.log10(vmodels.cH)
									vmodels.pOH = 14 - vmodels.pH
									vmodels.cOH = 10 ** -vmodels.pOH
								}
							},
							{
								name: 'cOH',
								units: 'M',
								onInput(vmodels) {
									vmodels.pOH = -Math.log10(vmodels.cOH)
									vmodels.pH = 14 - vmodels.pOH
									vmodels.cH = 10 ** -vmodels.pH
								}
							}
						]"
					/>

					<FormulaCalculator
						name="Henderson-Hasselbach equation"
						formula="pH == pKa + Log[10,(A/HA)]"
						:vars="['pH', 'pKa', 'A', 'HA']"
					>
						<Eq :cols="['3']">
							<Var name="pH" />
							<Plus :cols="['4']">
								<Var name="pKa" />
								<Log>
									<Div>
										<Var name="A" placeholder="A (M)" />
										<Var name="HA" placeholder="HA (M)" />
									</Div>
								</Log>
							</Plus>
						</Eq>
					</FormulaCalculator>

					<FormulaCalculator
						name="Ka ~ pKa"
						formula="pKa == -Log[10,Ka]"
						:vars="['pKa', 'Ka']"
					>
						<Eq>
							<Var name="pKa" />
							<Neg>
								<Log>
									<Var name="Ka" />
								</Log>
							</Neg>
						</Eq>
					</FormulaCalculator>

					<FormulaCalculator
						name="Concentration"
						formula="C == n/V"
						:vars="['C', 'n', 'V']"
					>
						<Eq :cols="['5']">
							<Var name="C" placeholder="C (mol/L)" />
							<Div>
								<Var name="n" placeholder="n (mol)" />
								<Var name="V" placeholder="V (L)" />
							</Div>
						</Eq>
					</FormulaCalculator>

					<FormulaCalculator
						name="n, m and M"
						formula="M == m/n"
						:vars="['M', 'm', 'n']"
					>
						<Eq :cols="['5']">
							<Var name="M" placeholder="M (g/mol)" />
							<Div>
								<Var name="m" placeholder="m (g)" />
								<Var name="n" placeholder="n (mols)" />
							</Div>
						</Eq>
					</FormulaCalculator>
					<!-- <Const name="R=8.3145 J/K/mol" /> -->
					<FormulaCalculator
						name="dG"
						formula="dG == -8.3145*T*Log[K]"
						:vars="['dG', 'T', 'K']"
					>
						<Eq :cols="['3']">
							<Var name="dG" units="J" />
							<Mult>
								<Neg>
									<Const name="8.3145 J/K/mol" />
								</Neg>
								<Var name="T" units="K" />
								<Log base="e">
									<Var name="K" />
								</Log>
							</Mult>
						</Eq>
					</FormulaCalculator>
					<FormulaCalculator
						name="DeltaC"
						formula="a*b==c*d"
						:vars="[]"
					>
						<Eq>
							<Mult>
								<Var name="a" placeholder="C1 (mol/L)" />
								<Var name="b" placeholder="V1 (mol/L)" />
							</Mult>
							<Mult>
								<Var name="c" placeholder="C2 (mol/L)" />
								<Var name="d" placeholder="V2 (mol/L)" />
							</Mult>
						</Eq>
					</FormulaCalculator>

					<FormulaCalculator
						name="K"
						formula="K == C^(c)*D^(d)/(A^(a)*B^(b))"
						:vars="['K', 'C', 'D', 'A', 'B', 'c', 'd', 'a', 'b']"
					>
						<Eq :cols="['3']">
							<Var name="K" />
							<Div>
								<Mult>
									<Pow>
										<Var name="C" />
										<Var name="c" value="1" />
									</Pow>
									<Pow>
										<Var name="D" />
										<Var name="d" value="1" />
									</Pow>
								</Mult>
								<Mult>
									<Pow>
										<Var name="A" />
										<Var name="a" value="1" />
									</Pow>
									<Pow>
										<Var name="B" />
										<Var name="b" value="1" />
									</Pow>
								</Mult>
							</Div>
						</Eq>
					</FormulaCalculator>

					<FormulaCalculator
						name="Ksp"
						formula="K == A^(a)*B^(b)"
						:vars="['K', 'A', 'B', 'a', 'b']"
					>
						<Eq :cols="['4']">
							<Var name="K" placeholder="Ksp" />
							<Mult>
								<Pow>
									<Var name="A" />
									<Var name="a" value="1" />
								</Pow>
								<Pow>
									<Var name="B" />
									<Var name="b" value="1" />
								</Pow>
							</Mult>
						</Eq>
					</FormulaCalculator>

					<FormulaCalculator
						name="V"
						formula="V == K*A^(a)*B^(b)*C^(c)"
						:vars="['V', 'K', 'A', 'B', 'C', 'a', 'b', 'c']"
					>
						<Eq :cols="['2']">
							<Var name="V" />
							<Mult>
								<Var name="K" />
								<Pow>
									<Var name="A" />
									<Var name="a" value="1" />
								</Pow>
								<Pow>
									<Var name="B" />
									<Var name="b" value="1" />
								</Pow>
								<Pow>
									<Var name="C" value="1" />
									<Var name="c" value="1" />
								</Pow>
							</Mult>
						</Eq>
					</FormulaCalculator>

					<FormulaCalculator
						name="Half life"
						formula="th == Log[2]/k"
						:vars="['th', 'k']"
					>
						<Eq :cols="['']">
							<Var name="th" placeholder="Half life" />
							<Div>
								<Const name="Log[2]" />
								<Var name="k" />
							</Div>
						</Eq>
					</FormulaCalculator>

					<FormulaCalculator
						name="First order kinetics"
						formula="Log[Af] == −k*t+Log[Ai]"
						:vars="['Ai', 'Af', 'k', 't']"
					>
						<Eq :cols="['3']">
							<Log base="e">
								<Var name="Af" />
							</Log>
							<Plus :cols="['8']">
								<Mult :cols="['']">
									<Neg>
										<Var name="k" />
									</Neg>
									<Var name="t" />
								</Mult>
								<Log base="e">
									<Var name="Ai" />
								</Log>
							</Plus>
						</Eq>
					</FormulaCalculator>

					<FormulaCalculator
						name="Arrhenius"
						formula="Log[k] == Log[A] - Ea/(8.3145*t)"
						:vars="['k', 'A', 'Ea', 't']"
					>
						<Eq :cols="['3']">
							<Log base="e">
								<Var name="k" />
							</Log>
							<Minus :cols="['']">
								<Log base="e">
									<Var name="A" />
								</Log>
								<Div>
									<Var name="Ea" />
									<Mult>
										<Const name="R=8.3145 J/K/mol" />
										<Var name="t" />
									</Mult>
								</Div>
							</Minus>
						</Eq>
					</FormulaCalculator>

					<FormulaCalculator
						name="Arrhenius 2"
						formula="Log[k2/k1] == -Ea/(8.3145) * (1/t2 - 1/t1)"
						:vars="['k1', 'k2', 'Ea', 't1', 't2']"
					>
						<Eq :cols="['3']">
							<Log base="e">
								<Div>
									<Var name="k2" />
									<Var name="k1" />
								</Div>
							</Log>
							<Mult :cols="['3']">
								<Neg>
									<Div>
										<Var name="Ea" />
										<Const name="R=8.3145 J/K/mol" />
									</Div>
								</Neg>
								<Parenth>
									<Minus>
										<Div>
											<Const name="1" />
											<Var name="t2" />
										</Div>
										<Div>
											<Const name="1" />
											<Var name="t1" />
										</Div>
									</Minus>
								</Parenth>
							</Mult>
						</Eq>
					</FormulaCalculator>

					<FormulaCalculator
						name="Similar Triangles"
						formula="a/b == c/d"
						:vars-need-set="3"
					>
						<Eq>
							<Div>
								<Var name="a" />
								<Var name="b" />
							</Div>
							<Div>
								<Var name="c" />
								<Var name="d" />
							</Div>
						</Eq>
					</FormulaCalculator>

					<!-- TODO: fixed width -->
					<!-- <div v-if="showHistory" class="history mx-0 ps-0">
				<ion-card title="History">
					<div class="d-flex flex-row-reverse">
						<ion-button
							class="justify-content-end"
							@click="showHistory = !showHistory"
							>Hide</ion-button
						>
					</div>
					<History />
				</ion-card>
			</div>
			<div v-if="!showHistory" class="history-button">
				<ion-button class="mt-5" @click="showHistory = !showHistory"
					>Hist</ion-button
				>
			</div> -->
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<style scoped>
.align-content-space-around {
	align-content: space-around;
}
</style>
