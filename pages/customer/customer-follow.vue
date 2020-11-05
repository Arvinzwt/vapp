<template>
    <!--客户跟进-->
    <el-main class="jr-customer-customer-follow">
        <!--基本信息-->
        <div class="bg-wrap">
            <div class="jr-title">
                <h3>基本信息</h3>
                <div><el-button size="mini" type="primary">+标签</el-button></div>
            </div>
            <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
                <!--标签-->
                <el-form-item label="标签">
                    <el-tag size="small" type="primary">标签1</el-tag>
                </el-form-item>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="姓名">
                            <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机">
                            <span class="mr-2">13122122212</span>
                            <span class="mr-2 el-icon-phone-outline text-color-brand cursor-pointer"></span>
                            <span class="el-icon-view text-color-brand cursor-pointer"></span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

    </el-main>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
    },
    data() {
        return {
            // 筛选参数信息
            paramMap: {
                show: true,//是否显示筛选
            },
        }
    }
}
</script>

<style lang="scss">
.jr-customer-customer-follow {
    min-width: 1000px;

    .jr-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    //块背景
    .bg-wrap {
        background-color: #fafafa; //常规
        padding: 5px 20px 5px;
        border-radius: 4px;
    }

    //tabs
    .details-tabs {
        margin-top: 20px;

        .el-tabs__header {
            margin-bottom: 0;
            border-bottom: none;

            .el-tabs__nav {
                border: none;
            }

            .el-tabs__item {
                font-size: 12px;
                border: none;
            }

            .is-active {
                background-color: #fafafa;
            }
        }

        .el-tabs__content {
            background-color: #fafafa;
            padding: 0;
            font-size: 12px;
        }
    }

    //时间线
    .details-timeline {
        .details-timeline_item {
            .details-timeline_title {
                height: 30px;
                padding-top: 15px;
                display: flex;
                align-items: center;

                .details-timeline_date {
                    max-width: 200px;
                    margin-right: 20px;
                }

                .details-timeline_user {
                    max-width: 120px;
                    margin-right: 20px;
                }
            }

            .details-timeline_content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #f7f7f7;
                padding: 8px 0;
                padding-right: 20px;

                .details-timeline_remark {
                    padding-left: 20px;
                    padding-right: 20px;
                }

                .details-timeline_audio {
                    audio {
                        display: block;
                        height: 30px;
                    }
                }
            }

            $iconWidth: 40px;

            .details-timeline_title, .details-timeline_content_wrap {
                padding-left: $iconWidth;
                position: relative;

                &:after {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: $iconWidth/2;
                    margin-left: -1px;
                    width: 2px;
                    background-color: #e4e7ed;
                }
            }

            .details-timeline_title {
                &:before {
                    content: '';
                    display: block;
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    left: $iconWidth/2;
                    margin-left: -6px;
                    border-radius: 50%;
                    background-color: #e4e7ed;;
                }
            }
        }
    }

    //地图
    .map-box {
        display: flex;

        $width: 760px;
        $height: 380px;

        #map {
            width: $width*0.7;
            height: $height;
            border-right: none;
        }


        $pt: 10px;
        $pl: 15px;

        .map-list-wrap {
            padding: $pt 0;

            ul {
                width: $width*0.3;
                height: $height - $pt*2;
                overflow-y: scroll;

                .map-item {
                    padding: 10px $pl;
                    cursor: pointer;

                    .title {
                        font-size: 14px;
                        font-weight: bold;
                    }

                    .detail {
                        font-size: 12px;
                        margin-top: 4px;
                    }

                    .title, .detail {
                        width: $width*0.3 - $pl*2;
                    }

                    &:hover {
                        background-color: #F5F7FA;
                    }
                }
            }
        }

        .map-default {
            font-size: 13px;
            text-align: center;
            padding: 15px 0;
        }
    }
}
</style>
