import { defineComponent, h, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import { LeafThrough as Magazine } from './LeafThrough.js';
export const LeafThrough = defineComponent({
    name: 'LeafThrough',
    props: {
        pages: {
            type: Array,
            required: true
        },
        startPage: Number,
        layout: String,
        spreadQuery: String,
        pageAspect: Number,
        loop: {
            type: Boolean,
            default: undefined
        },
        bleed: {
            type: Boolean,
            default: undefined
        },
        paper: Object,
        lighting: Object,
        motion: Object,
        interaction: Object,
        maxPixelRatio: Number,
        preload: Number,
        plain: {
            type: Boolean,
            default: undefined
        },
        label: String,
        formatPageLabel: Function
    },
    emits: {
        pagechange: (_detail)=>true,
        ready: ()=>true,
        pageload: (_page)=>true,
        error: (_error, _page)=>true
    },
    setup (props, { emit, expose }) {
        const element = ref();
        const instance = shallowRef(null);
        const events = {
            onPageChange: (detail)=>emit('pagechange', detail),
            onReady: ()=>emit('ready'),
            onPageLoad: (page)=>emit('pageload', page),
            onError: (error, page)=>emit('error', error, page)
        };
        const options = ()=>({
                ...props,
                ...events
            });
        onMounted(()=>{
            instance.value = new Magazine(element.value, options());
        });
        watch(options, (next)=>instance.value?.setOptions(next), {
            deep: true
        });
        onBeforeUnmount(()=>{
            instance.value?.dispose();
            instance.value = null;
        });
        expose({
            next: ()=>instance.value?.next() ?? false,
            prev: ()=>instance.value?.prev() ?? false,
            goTo: (page, goToOptions)=>instance.value?.goTo(page, goToOptions),
            instance
        });
        return ()=>h('div', {
                ref: element
            });
    }
});
export default LeafThrough;


//# sourceURL=vue.ts