
<template>
    <div class="write_information">
        <van-nav-bar title="填写入学信息" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="main">
            <h3 class="header_notice">
                中等职业学校报名须知
            </h3>
            <div class="cells">
                <ul style="margin-top:10px">
                        <li>为深入贯彻落实全国教育大会精神、《国家职业教育改革实施方案》（以下简称“职教20条”）和《教育部  海南省人民政府落实“职教20条”备忘录》，推进我省中等职业教育健康持续发展，根据《教育部办公厅关于做好2020年中等职业学校招生工作的通知》（教职成厅〔2020〕1号）精神，切实做好2020年我省中等职业学校招生管理工作，现就有关事项通知如下：</li>
                        <li>  一、招生指导计划、录取办法及时间安排</li>
                        <li>（一）招生指导计划：根据教育部下达的计划任务数、我省2020年初中适龄人数和应届初中毕业生数，按照高中阶段教育普职比大体相当的原则，确定2020年我省中等职业教育招生计划为4.95万人。</li>
                        <li>（二）录取办法及时间：2020年中等职业学校招生录取实行省中招录取系统录取和注册入学两种办法。</li>
                        <li> 1.海南省职业教育人才培养及招生试点项目（中高职“3+2”连读、中高职“3+2”分段培养试点项目）的招生计划统一在省中招录取系统录取。</li>
                </ul>
            </div>
        </div>
        <div class="footer_btn">
            <div class="btn" @click="next">
              <van-button color="#498ef5" size="large">我已阅读</van-button>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
        data() {
            return {
                    
            }
        },
        methods: {
            next() {
                this.$router.push({
                    path: '/home/secondarySchool'
                })
            }
        }
	}
</script>

<style lang="scss" scoped>
    .write_information {
        height: 100%;
        .main{
            margin-bottom: 180px;
            .header_notice{
                padding: 25px;
                font-size: 30px;
                font-weight: normal;
                text-align: center;
            }
          .cells {
                background: #fff; 
                line-height: 60px;
                padding: 25px;
                font-size: 26px;    
          }
        }
        .footer_btn{
            position: fixed;
            bottom: 0;
            z-index: 1000;
            min-height: 80px;
            width: 100%;
            background: #fff;
            padding: 25px;
        }
    }
</style>