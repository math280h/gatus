<script setup>
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, X, CircleOff } from "lucide-vue-next";
</script>

<template>
  <Card class="endpoint dark:bg-card-secondary-dark border-none shadow-xl">
    <CardHeader>
      <div class="flex flex-wrap mb-2">
        <div class="w-3/4">
          <router-link
            :to="generatePath()"
            class="font-bold hover:text-blue-800 hover:underline dark:hover:text-blue-400"
            title="View detailed endpoint health"
          >
            {{ data.name }}
          </router-link>
          <span
            v-if="
              data.results &&
              data.results.length &&
              data.results[data.results.length - 1].hostname
            "
            class="text-gray-500 font-light"
          >
            | {{ data.results[data.results.length - 1].hostname }}</span
          >
        </div>
        <div class="w-1/4 text-right">
          <span
            class="font-light overflow-x-hidden cursor-pointer select-none hover:text-gray-500"
            v-if="data.results && data.results.length"
            @click="toggleShowAverageResponseTime"
            :title="
              showAverageResponseTime
                ? 'Average response time'
                : 'Minimum and maximum response time'
            "
          >
            <slot v-if="showAverageResponseTime">
              ~{{ averageResponseTime }}ms
            </slot>
            <slot v-else>
              {{
                minResponseTime === maxResponseTime
                  ? minResponseTime
                  : minResponseTime + "-" + maxResponseTime
              }}ms
            </slot>
          </span>
          <!--        <span class="text-sm font-bold cursor-pointer">-->
          <!--          ⋯-->
          <!--        </span>-->
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div>
        <div class="status-over-time flex flex-row">
          <slot v-if="data.results && data.results.length">
            <slot v-if="data.results.length < maximumNumberOfResults">
              <span
                v-for="filler in maximumNumberOfResults - data.results.length"
                :key="filler"
                class="status flex justify-center items-center border-y-2 h-[28px] border-r-2 first:border-l-2 border-gray-400 last:border-r-0 first:rounded-l-md last:rounded-r-md"
                >
                <CircleOff
                  size="16"
                />
                </span
              >
            </slot>
            <slot v-for="result in data.results" :key="result">
              <span
                v-if="result.success"
                class="status flex justify-center items-center bg-success h-[28px] border-r-2 border-gray-400 last:border-r-0 first:rounded-l-md last:rounded-r-md"
                @mouseenter="showTooltip(result, $event)"
                @mouseleave="showTooltip(null, $event)"
              >
                <Check />
              </span>
              <span
                v-else
                class="status flex justify-center items-center bg-red-600 h-[28px] border-r-2 border-gray-400 last:border-r-0 first:rounded-l-md last:rounded-r-md"
                @mouseenter="showTooltip(result, $event)"
                @mouseleave="showTooltip(null, $event)"
              >
                <X />
              </span>
            </slot>
          </slot>
          <slot v-else>
            <span
              v-for="filler in maximumNumberOfResults"
              :key="filler"
              class="status border border-dashed border-gray-400 first:rounded-l-md last:rounded-r-md"
              >X</span
            >
          </slot>
        </div>
      </div>
      <div class="flex flex-wrap status-time-ago">
        <slot v-if="data.results && data.results.length">
          <div class="w-1/2">
            {{ generatePrettyTimeAgo(data.results[0].timestamp) }}
          </div>
          <div class="w-1/2 text-right">
            {{
              generatePrettyTimeAgo(
                data.results[data.results.length - 1].timestamp
              )
            }}
          </div>
        </slot>
        <slot v-else>
          <div class="w-1/2">&nbsp;</div>
        </slot>
      </div>
    </CardContent>
  </Card>
</template>

<script>
import { helper } from "@/mixins/helper";

export default {
  name: "Endpoint",
  props: {
    maximumNumberOfResults: Number,
    data: Object,
    showAverageResponseTime: Boolean,
  },
  emits: ["showTooltip", "toggleShowAverageResponseTime"],
  mixins: [helper],
  methods: {
    updateMinAndMaxResponseTimes() {
      let minResponseTime = null;
      let maxResponseTime = null;
      let totalResponseTime = 0;
      for (let i in this.data.results) {
        const responseTime = parseInt(
          (this.data.results[i].duration / 1000000).toFixed(0)
        );
        totalResponseTime += responseTime;
        if (minResponseTime == null || minResponseTime > responseTime) {
          minResponseTime = responseTime;
        }
        if (maxResponseTime == null || maxResponseTime < responseTime) {
          maxResponseTime = responseTime;
        }
      }
      if (this.minResponseTime !== minResponseTime) {
        this.minResponseTime = minResponseTime;
      }
      if (this.maxResponseTime !== maxResponseTime) {
        this.maxResponseTime = maxResponseTime;
      }
      if (this.data.results && this.data.results.length) {
        this.averageResponseTime = (
          totalResponseTime / this.data.results.length
        ).toFixed(0);
      }
    },
    generatePath() {
      if (!this.data) {
        return "/";
      }
      return `/endpoints/${this.data.key}`;
    },
    showTooltip(result, event) {
      this.$emit("showTooltip", result, event);
    },
    toggleShowAverageResponseTime() {
      this.$emit("toggleShowAverageResponseTime");
    },
  },
  watch: {
    data: function () {
      this.updateMinAndMaxResponseTimes();
    },
  },
  created() {
    this.updateMinAndMaxResponseTimes();
  },
  data() {
    return {
      minResponseTime: 0,
      maxResponseTime: 0,
      averageResponseTime: 0,
    };
  },
};
</script>

<style>
.endpoint:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.endpoint:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-bottom-width: 3px;
}

.status-over-time {
  overflow: auto;
}

.status {
  cursor: pointer;
  transition: all 500ms ease-in-out;
  overflow-x: hidden;
  color: white;
  width: 5%;
  font-size: 75%;
  font-weight: 700;
  text-align: center;
}

.status:hover {
  opacity: 0.7;
  transition: opacity 100ms ease-in-out;
  color: black;
}

.status-time-ago {
  color: #6a737d;
  opacity: 0.5;
  margin-top: 5px;
}

@media screen and (max-width: 600px) {
  .status.status-success::after,
  .status.status-failure::after {
    content: " ";
    white-space: pre;
  }
}
</style>
