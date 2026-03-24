import { director, Director, sys } from "cc";
import { EDITOR } from "cc/env";
import { dataMgr } from "./DataMgr";
import { eventMgr } from "./EventMgr";

export enum LanguageType {
    zh_cn = 'zh_cn', //中文简体
    zh_ft = 'zh_ft', //中文繁体
    en = 'en', //英语
    ko = 'ko', //韩语
    ja = 'ja', //日语
    de = 'de', //德语
    fr = 'fr', //法语
    es = 'es', //西班牙语
    pt = 'pt', //葡萄牙语
    it = 'it', //意大利语 
    be = 'be', //白俄罗斯语
    uk = 'uk', //乌克兰语 
    id = 'id', //印度尼西亚语
    ru = 'ru', //俄语
    ar = 'ar', //阿拉伯语
    vi = 'vi', //越南语
}

/** 
 * 语言管理器
 * 提供语言本地化：配置语言数据、更改语言设置、获取翻译文本。 
 */
class LangMgr {
    /** 当前选择的语言 */
    private currLang: string = "zh_cn"; // 设置默认值避免undefined

    /** 缓存的语言数据 */
    private langData: Record<string, Record<string, string>> = {};

    /** 支持的语言列表 */
    private supportedLanguages: string[] = ["zh_cn", "en", "fr", "zh_ft", "ja", "ko"];

    /** 是否已初始化 */
    private initialized: boolean = false;

    /** 私有构造函数，确保外部无法直接通过new创建实例 */
    private constructor() {
        // 立即执行一次初始化，以便在组件onLoad时能获取到语言
        this.init();
        
        if (!EDITOR) {
            // 场景加载后再次初始化，确保读取到正确的语言设置
            director.once(Director.EVENT_AFTER_SCENE_LAUNCH, this.init, this);
        }
    }

    /** 单例实例 */
    public static readonly instance: LangMgr = new LangMgr();

    /** 初始化多语言 */
    private init(): void {
        if (this.initialized) return;
        
        // // 先尝试获取用户保存的语言设置
        // const savedLang = dataMgr.getText("language");
        // if (savedLang && this.supportedLanguages.includes(savedLang)) {
        //     this.currLang = savedLang;
        // } else {
        //     // 如果没有用户保存的语言设置，则尝试使用系统语言
        //     const sysLang = this.getSystemLanguage();
        //     if (this.supportedLanguages.includes(sysLang)) {
        //         this.currLang = sysLang;
        //         // 保存系统语言设置到用户数据
        //         dataMgr.setData("language", sysLang);
        //     }
        //     // 如果系统语言不在支持列表中，则使用默认语言(已在类初始化时设置为"zh")
        // }


        // 试玩广告默认使用系统语言
        const sysLang = this.getSystemLanguage();
        if (this.supportedLanguages.includes(sysLang)) {
            this.currLang = sysLang;
            // 保存系统语言设置到用户数据
            dataMgr.setData("language", sysLang);
        }
        
        this.initialized = true;
    }

    /**
     * 获取系统语言
     * @returns 系统语言代码，如"zh"、"en"等
     */
    private getSystemLanguage(): string {
        let language: LanguageType = LanguageType.en;
        let lang = navigator.language;
        lang = lang.split('-')[0];
        switch (lang) {
            case 'zh': {
                switch (navigator.language) {
                    case 'zh-CN': {
                        language = LanguageType.zh_cn;
                        break;
                    }
                    default: {//除大陆外其他地区统一都为繁体
                        language = LanguageType.zh_ft;
                        break;
                    }
                }
                break;
            }
            case 'en': {
                language = LanguageType.en;
                break;
            }
            case 'ko': {
                language = LanguageType.ko;
                break;
            }
            case 'ja': {
                language = LanguageType.ja;
                break;
            }
            case 'de': {
                language = LanguageType.de;
                break;
            }
            case 'fr': {
                language = LanguageType.fr;
                break;
            }
            case 'es': {
                language = LanguageType.es;
                break;
            }
            case 'pt': {
                language = LanguageType.pt;
                break;
            }
            case 'it': {
                language = LanguageType.it;
                break;
            }
            case 'be': {
                language = LanguageType.be;
                break;
            }
            case 'uk': {
                language = LanguageType.uk;
                break;
            }
            case 'id': {
                language = LanguageType.id;
                break;
            }
            case 'ru': {
                language = LanguageType.ru;
                break;
            }
            case 'ar': {
                language = LanguageType.ar;
                break;
            }
            case 'vi': {
                language = LanguageType.vi;
                break;
            }
            default: {
                language = LanguageType.en;
                break;
            }
        }
        
        return language;
    }

    /** 获取当前语言 */
    public get lang(): string {
        return this.currLang;
    }
    
    /** 获取所有支持的语言 */
    public get languages(): string[] {
        return [...this.supportedLanguages];
    }

    /** 更改当前语言 */
    public changeLang(langCode: string): void {
        if (this.currLang === langCode || !this.supportedLanguages.includes(langCode)) return;

        this.currLang = langCode;
        dataMgr.setData("language", langCode);
        eventMgr.emit("langChange");
    }

    /** 注册语言数据 */
    public registerLanguageData(langCode: string, data: Record<string, string>): void {
        if (!this.supportedLanguages.includes(langCode)) {
            this.supportedLanguages.push(langCode);
        }
        
        this.langData[langCode] = { 
            ...this.langData[langCode], 
            ...data 
        };
    }

    /** 
     * 批量注册多种语言的数据
     * @param data 格式为: { key: { zh: "中文", en: "English" } }
     */
    public registerMultiLanguageData(data: Record<string, Record<string, string>>): void {
        // 提取所有语言代码
        const allLangCodes = new Set<string>();
        Object.values(data).forEach(translations => {
            Object.keys(translations).forEach(lang => allLangCodes.add(lang));
        });
        
        // 为每种语言整理数据并注册
        allLangCodes.forEach(langCode => {
            const langData: Record<string, string> = {};
            
            Object.entries(data).forEach(([key, translations]) => {
                if (translations[langCode]) {
                    langData[key] = translations[langCode];
                }
            });
            
            this.registerLanguageData(langCode, langData);
        });
    }

    /** 根据键获取对应的翻译文本 */
    public getLanguage(key: string, def: string = ""): string {
        const text = this.langData[this.currLang]?.[key] ?? def;
        return text;
    }
}

/** 导出单例实例 */
export const langMgr = LangMgr.instance;

// 立即注册多语言数据，确保在使用前已加载
langMgr.registerMultiLanguageData({
    "Download": {
        "zh_cn": "PLAY NOW",
        "en": "PLAY NOW",
        "fr": "JOUER MAINTENANT",
        "zh_ft": "立即游玩",
        "ja": "今すぐプレイ",
        "ko": "지금 플레이"
    },
    "Continue": {
        "zh_cn": "CONTINUE",
        "en": "CONTINUE",
        "fr": "CONTINUER",
        "zh_ft": "继续",
        "ja": "続ける",
        "ko": "계속하기"
    },
    "Next": {
        "zh_cn": "NEXT LEVEL",
        "en": "NEXT LEVEL",
        "fr": "NIVEAU SUIVANT",
        "zh_ft": "下一关",
        "ja": "次のレベル",
        "ko": "다음 레벨로"
    },
    "SwipeToMove": {
        "zh_cn": "SWIPE TO MOVE",
        "en": "SWIPE TO MOVE",
        "fr": "SWIPE POUR DÉPLACER",
        "zh_ft": "轻划移动",
        "ja": "スワイプで移動",
        "ko": "스와이프로 이동"
    },
    "GameWin": {
        "zh_cn": "GAME WIN",
        "en": "GAME WIN",
        "fr": "VICTOIRE",
        "zh_ft": "遊戲勝利",
        "ja": "ゲーム勝利",
        "ko": "게임 승리"
    },
    "GameFail": {
        "zh_cn": "GAME LOSE",
        "en": "GAME LOSE",
        "fr": "ÉCHEC DU JEU",
        "zh_ft": "遊戲失敗",
        "ja": "ゲーム敗北",
        "ko": "게임 실패"
    },
    "ReTry": {
        "zh_cn": "RETRY",
        "en": "RETRY",
        "fr": "RECOMMENCER",
        "zh_ft": "复活",
        "ja": "再試行",
        "ko": "다시 시도"
    },
    "Full": {
        "zh_cn": "MAX",
        "en": "MAX",
        "fr": "MAX",
        "zh_ft": "MAX",
        "ja": "MAX",
        "ko": "MAX"
    },
    "HoldToMoveTrain": {
        "zh_cn": "HOLD TO MOVE TRAIN",
        "en": "HOLD TO MOVE TRAIN",
        "fr": "GARDEZ POUR DÉPLACER LE TREMPEL",
        "zh_ft": "按住移动火车",
        "ja": "トレンチを押して移動",
        "ko": "트렌치를 누르고 이동"
    },
});
