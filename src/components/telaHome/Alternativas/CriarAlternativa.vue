<template>
    <Nav />
    <br><br>
    <v-container class="mt-8">
        <v-card elevation="0">
            <v-card-title class="text-blue font-weight-bold text-center text-h5">Adicionar Alternativa</v-card-title>
            <v-card-text>

                <v-form ref="form" @submit="criarAlternativa">
                    <label>Questão</label>
                    <select class="custom-select mt-2" id="questao" name="questao" v-model="enunciadoQuestao">
                        <option value="">Selecione uma questao</option>
                        <option v-for="questao in questoes"
                            :value="{ id_questao: questao.id_questao, enunciado: questao.enunciado }">{{ questao.enunciado
                            }}</option>
                    </select>
                    <br><br>
                    <label>Enunciado da Alternativa</label>
                    <v-textarea placeholder="Exemplo: a) 2 + 2 = 4" class="mt-3" rows="2" row-height="20" variant="solo"
                        v-model="enunciado"></v-textarea>
                    <v-checkbox color="success" v-model="correta" label="Marque se for a alternativa correta" class="pr-0"
                        true-value="1" false-value="0"></v-checkbox>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-center align-itens-center">
                <v-btn :height="50" :width="240" class="bg-blue rounded-pill text-h6" @click="alternativa">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
  
<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import Nav from '@/components/Nav.vue';
export default defineComponent({
    components: {
        Nav,
    },
    setup() {
        const enunciadoQuestao = ref(null);
        const questoes = ref([]);
        const enunciado = ref('');
        const correta = ref('');
        const route = useRoute();
        const router = useRouter();

        const criarAlternativa = async () => {
            const enunciadoDaQuestao = enunciadoQuestao.value ? enunciadoQuestao.value.enunciado : '';

            const formData = {
                enunciado: enunciado.value,
                correta: correta,
                enunciadoQuestao: enunciadoDaQuestao,
            };

            try {
                const response = await axios.post('https://api-quest-bank.vercel.app/alternativa/adicionar', formData);
                console.log('Alternativa criada:', response.data);
            } catch (error) {
                console.error('Erro ao criar alternativa:', error);
            }
        };

        const alternativa = () => {
            if (route.path !== '/telaConfim') {
                criarAlternativa();
                router.push('/telaConfim');
            } else {
                router.push('/telaErro');
            }
        };

        const carregarQuestoes = async () => {
            try {
                const response = await axios.get('https://api-quest-bank.vercel.app/questao/listar');
                questoes.value = response.data.questoes;
            } catch (error) {
                console.error('Erro ao carregar questões:', error);
            }
        };

        carregarQuestoes();

        return {
            enunciado,
            questoes,
            correta,
            criarAlternativa,
            alternativa,
            enunciadoQuestao
        };
    },
});
</script>
<style>
option {
    color: #3f3f3f;
}

.custom-select {
    width: 100%;
    height: 55px;
    padding: 8px;
    font-size: 16px;
    border: 0.4px groove #eeeeee;
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(4, 4, 3, 0.25);
    color: #9c9c9c;
    cursor: pointer;
}

.custom-select:focus {

    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px #007bff;
}
</style> 