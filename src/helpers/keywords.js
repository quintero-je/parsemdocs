const keywords = [
    { name: 'post_title' },
    { name: 'post_content' },
    { name: 'post_excerpt' },
    { name: 'featured_image' },
    { name: '_company_id' },
    { name: 'ndc' },
    { name: '_imprint_id' },
    {
        name: '_general',
        words: /(General)/gi,
        text: ''
    },
    {
        name: '_composition',
        words: /(Composition)|(Exipients)/gi,
        text: ''
    },
    {
        name: '_properties',
        words: /(Pharmacological properties)|(Properties)/gi,
        text: ''
    },
    {
        name: '_pharmacokinetics',
        words: /(Pharmacokinetic)/gi,
        text: ''
    },
    {
        name: '_pharmacodynamics',
        words: /(Pharmacodynamic)/gi,
        text: ''
    },
    {
        name: '_preclinical_safety_data',
        words: /(Preclinical)|(safety data)/gi,
        text: ''
    },
    {
        name: '_incompatibilities',
        words: /(Incompatibilities)/gi,
        text: ''
    },
    {
        name: '_indications',
        words: /(Therapeutic indications)|(Clinical particulars)|(Indications)/gi,
        text: ''
    },
    {
        name: '_contra_indications',
        words: /(Contraindications)/gi,
        text: ''
    },
    {
        name: '_side_effects',
        words: /(Undesirable effects)|(Side Effects)/gi,
        text: ''
    },
    {
        name: '_overdosage',
        words: /(Overdose)|(OVERDOSAGE)/gi,
        text: ''
    },
    {
        name: '_precautions',
        words: /(Special warnings and precautions for use)|(Warnings and Precautions)/gi,
        text: ''
    },
    {
        name: '_pregnancy',
        words: /(Fertility, pregnancy and lactation)|(Pregnancy and Lactation )/gi,
        text: ''
    },
    {
        name: '_effects_driving_um',
        words: /(Effects on ability to drive and use machines)|(Effects on Driving and Using Machines)/gi,
        text: ''
    },
    {
        name: '_drug_interactions',
        words: /(Interaction with other medicinal products and other forms of interaction)|(Drug Interactions)/gi,
        text: ''

    },
    {
        name: '_dosage_administration',
        words: /(Posology and method of administration)|(Dosage and Administration)/gi,
        text: ''
    },
    {
        name: '_storage',
        words: /(Special precautions for storage)|(Shelf life)/gi,
        text: ''
    },
    {
        name: '_packaging',
        words: /(Nature and contents of container)|(Packaging)/gi,
        text: ''
    },
    {
        name: '_handling_disposal',
        words: /(Special precautions for disposal and other handling)|(Handling and Disposal)|(handling)|(disposal)/gi,
        text: ''
    },
    {
        name: '_pharmaceutical_form',
        words: /(Pharmaceutical form)|( form)/gi,
        text: '',
    },
    {
        'ememi_drug_category': null
    },

    {
        'ememi_generic_category': null

    },
    {
        'ememi_index': null

    },
    {
        'ememi_solution': null

    },
    {
        'drug_color': null

    },
    {
        'drug_shape': null
    }
]

module.exports = keywords